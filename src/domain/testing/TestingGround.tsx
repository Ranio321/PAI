import { useEffect } from "react";
import { useThree } from "react-three-fiber";
import * as THREE from "three";

export default function TestingGround() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.x = 100;
    camera.position.y = 200;
    camera.position.z = 200;
  }, []);

  return (
    <>
      <mesh position={[100, -100, 150]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 600]} />
        <meshMatcapMaterial color="green" side={THREE.DoubleSide} />
      </mesh>
      <ambientLight />
    </>
  );
}
