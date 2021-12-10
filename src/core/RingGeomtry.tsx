import { forwardRef, ReactNode, Ref } from "react";
import { DoubleSide } from "three";

interface RingGeometryProps {
  color: string;
  innerRadius: number;
  outerRadius: number;
  hide?: boolean;
}
function RingGeometry(props: RingGeometryProps, ref: Ref<ReactNode>) {
  const { color, innerRadius, outerRadius, hide } = props;

  return (
    <mesh scale={[1, 1, 1]} ref={ref}>
      <ringBufferGeometry args={[innerRadius, outerRadius, 30]} />
      <meshBasicMaterial
        color={color}
        depthTest={false}
        side={DoubleSide}
        transparent
        opacity={0.8}
        visible={!hide}
      />
    </mesh>
  );
}

export default forwardRef(RingGeometry);
