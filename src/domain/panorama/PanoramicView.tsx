import React, { useRef } from "react";
import { ReactNode, Ref } from "react";
import { MeshBasicMaterialProps, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { View } from "../../views/types";
import panoramaParams from "./constants";
import TransitionHotspots from "./hotspot/TransitionHotspots";
interface PanoramicViewProps extends MeshBasicMaterialProps {
  keyDown: (viewName: string) => any;
  view: View;
  transition?: boolean;
}

function PanoramicView(
  props: PanoramicViewProps,
  ref: Ref<ReactNode>
): JSX.Element {
  const { view, keyDown, transition, ...rest } = props;
  const texture = useLoader(THREE.TextureLoader, view.image);
  const meshRef = useRef<MeshBasicMaterialProps>(null);
  const sphereArgs = panoramaParams;

  return (
    <>
      <mesh ref={meshRef} scale={[-1, 1, 1]} renderOrder={5}>
        <sphereBufferGeometry
          args={[
            sphereArgs.radius,
            sphereArgs.widthSegmments,
            sphereArgs.heightSegments,
          ]}
        />
        <meshBasicMaterial
          ref={ref}
          {...rest}
          map={texture}
          side={THREE.DoubleSide}
        />
      </mesh>
      {!transition && <TransitionHotspots />}
      {/* <TransitionHotspotPlacing planeRef={meshRef} /> */}
    </>
  );
}

export default React.forwardRef(PanoramicView);
