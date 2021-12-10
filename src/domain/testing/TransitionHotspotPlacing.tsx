import { ReactNode, Ref, useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import getIntersectionWithObject from "../../utils/getIntersectionWithObject";
import TransitionHotspot from "../panorama/hotspot/TransitionHotspot";
interface TransitionHotspotPlacingProps {
  planeRef: Ref<ReactNode>;
}

export default function TransitionHotspotPlacing({
  planeRef,
}: TransitionHotspotPlacingProps) {
  const { camera } = useThree();
  const transitionHotspotRef = useRef<THREE.Group>(null);
  useEffect(() => {
    document.addEventListener("click", clickEvent);
    document.addEventListener("mousemove", mouseMove);

    function clickEvent(e: MouseEvent) {
      const IP = getIntersectionWithObject(e, planeRef, camera);
    }

    function mouseMove(e: MouseEvent) {
      const IP = getIntersectionWithObject(e, planeRef, camera)?.point;
      if (transitionHotspotRef.current && IP) {
        const position = transitionHotspotRef.current.position;
        position.x = IP.x;
        position.y = IP.y;
        position.z = IP.z;
      }
    }

    return () => {
      document.removeEventListener("click", clickEvent);
      document.removeEventListener("mousemove", mouseMove);
    };
  });

  return (
    <TransitionHotspot
      position={{ x: 1000, y: 1000, z: 1000 }}
      onClick={() => {}}
      ref={transitionHotspotRef}
    />
  );
}
