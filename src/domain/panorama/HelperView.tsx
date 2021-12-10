import React from "react";
import { ReactNode, Ref } from "react";
import { MeshBasicMaterialProps, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { View } from "../../views/types";
import panoramaParams from "./constants";
interface HelperViewProps extends MeshBasicMaterialProps {
  view: View;
}

function HelperView(props: HelperViewProps, ref: Ref<ReactNode>): JSX.Element {
  const { view, ...rest } = props;
  const texture = useLoader(THREE.TextureLoader, view.image);
  const sphereArgs = panoramaParams;
  return (
    <mesh scale={[-1, 1, 1]} renderOrder={5}>
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
        transparent={true}
      />
    </mesh>
  );
}

export default React.forwardRef(HelperView);
