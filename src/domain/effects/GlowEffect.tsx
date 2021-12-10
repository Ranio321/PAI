// @ts-nocheck
import * as THREE from "three";
import React, { useRef, useEffect, useMemo } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass });

const materials = {};
const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const darkenNonBloomed = (obj: any) =>
  obj.isMesh &&
  !obj.userData.active &&
  ((materials[obj.uuid] = obj.material), (obj.material = darkMaterial));
const restoreMaterial = (obj) =>
  materials[obj.uuid] &&
  ((obj.material = materials[obj.uuid]), delete materials[obj.uuid]);
export default function GlowEffect() {
  const { gl, scene, camera, size } = useThree();

  const [bloom, final] = useMemo(() => {
    const renderScene = new RenderPass(scene, camera);
    const comp = new EffectComposer(gl);
    comp.renderToScreen = false;
    comp.addPass(renderScene);
    comp.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 1.5, 1, 0));

    const finalComposer = new EffectComposer(gl);
    finalComposer.addPass(renderScene);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: comp.renderTarget2.texture },
      },
      vertexShader:
        "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",
      fragmentShader:
        "uniform sampler2D baseTexture; uniform sampler2D bloomTexture; varying vec2 vUv; vec4 getTexture( sampler2D texelToLinearTexture ) { return mapTexelToLinear( texture2D( texelToLinearTexture , vUv ) ); } void main() { gl_FragColor = ( getTexture( baseTexture ) + vec4( 1.0 ) * getTexture( bloomTexture ) ); }",
    });
    material.map = true;
    const finalPass = new ShaderPass(material, "baseTexture");
    finalPass.needsSwap = true;
    finalComposer.addPass(finalPass);
    const fxaa = new ShaderPass(FXAAShader);
    fxaa.material.uniforms["resolution"].value.x = 1 / size.width;
    fxaa.material.uniforms["resolution"].value.y = 1 / size.height;
    finalComposer.addPass(fxaa);
    return [comp, finalComposer];
  }, []);

  useEffect(() => {
    bloom.setSize(size.width, size.height);
    final.setSize(size.width, size.height);
  }, [bloom, final, size]);

  useFrame(() => {
    scene.traverse(darkenNonBloomed);
    bloom.render();
    final.render();
  }, 1);
  return null;
}
