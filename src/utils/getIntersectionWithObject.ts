import * as THREE from "three";
import { Camera } from "three";

export default function getIntersectionWithObject(event: MouseEvent, planeRef:any, camera:Camera): THREE.Intersection | undefined {
    const raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([planeRef.current]);
    return intersects[0];
  }