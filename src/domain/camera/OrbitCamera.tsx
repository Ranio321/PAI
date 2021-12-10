import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
interface OrbitCameraProps {
  testing?: boolean;
}

export default function OrbitCamera({
  testing,
}: OrbitCameraProps): JSX.Element {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isCameraRotating, setIsCameraRotating] = useState(false);

  useEffect(() => {
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlerPointerMove);
    document.addEventListener("pointerup", handlePointerUp);

    function handlePointerDown(e: MouseEvent) {
      setIsPointerDown(true);
    }

    function handlerPointerMove() {
      setIsCameraRotating(isPointerDown);
    }

    function handlePointerUp() {
      setIsPointerDown(false);
      setIsCameraRotating(false);
    }
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlerPointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isPointerDown]);

  useEffect(() => {
    document.body.style.cursor = isCameraRotating ? "move" : "pointer";
  }, [isCameraRotating]);

  return (
    <OrbitControls
      enableZoom={testing}
      enablePan={false}
      enableDamping
      dampingFactor={0.1}
      autoRotate={false}
      rotateSpeed={-0.2}
      screenSpacePanning={false}
    />
  );
}
