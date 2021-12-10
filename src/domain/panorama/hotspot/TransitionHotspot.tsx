import { forwardRef, ReactNode, Ref, useReducer, useState } from "react";
import { useFrame } from "react-three-fiber";
import RingGeometry from "../../../core/RingGeomtry";
import transitionHotspotReducer, {
  transitionHotspotInitialState,
  TransitionTypes,
} from "../../../reducers/transitionHotspotReducer";

interface TransitionHotspotProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  onClick: () => any;
}
function TransitionHotspot(props: TransitionHotspotProps, ref: Ref<ReactNode>) {
  const { position, onClick } = props;
  const [state, dispatch] = useReducer(
    transitionHotspotReducer,
    transitionHotspotInitialState
  );
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (isHovered && state.innerCircle.outerRadius < 2) {
      dispatch({ type: TransitionTypes.increaseSize, param: 0.1 });
    }

    if (!isHovered && state.innerCircle.outerRadius > 1.3) {
      dispatch({ type: TransitionTypes.decreaseSize, param: 0.1 });
    }
  });

  return (
    <group
      ref={ref}
      position={[position.x, position.y, position.z]}
      renderOrder={1}
      rotation={[Math.PI / 2, Math.PI / 1, 0]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={onClick}
    >
      <RingGeometry color={state.color} {...state.innerCircle} />
      <RingGeometry color={state.color} {...state.outerCricle} />
      <RingGeometry
        color={state.color}
        innerRadius={state.innerCircle.innerRadius}
        outerRadius={state.outerCricle.outerRadius}
        hide
      />
    </group>
  );
}
export default forwardRef(TransitionHotspot);
