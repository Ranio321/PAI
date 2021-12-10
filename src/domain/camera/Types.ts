import { ReactThreeFiber } from "react-three-fiber";
import * as THREE from "three";

export default interface Camera extends Partial<
ReactThreeFiber.Object3DNode<THREE.Camera, typeof THREE.Camera> &
  ReactThreeFiber.Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera> &
  ReactThreeFiber.Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>
>{}