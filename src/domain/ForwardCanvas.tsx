import { Canvas } from "react-three-fiber";
import ProvideView from "../provider/ProvideView";
import Camera from "./camera/Types";
interface ForwardCanvasProps {
  children: JSX.Element;
  camera: Camera;
}

export default function ForwardCanvas(props: ForwardCanvasProps) {
  const { children, ...rest } = props;
  return (
    <Canvas {...rest}>
      <ProvideView>{children}</ProvideView>
    </Canvas>
  );
}
