import { Suspense } from "react";
import "./App.css";
import OrbitCamera from "./domain/camera/OrbitCamera";
import Panorama from "./domain/panorama/Panorama";
import ProvideView from "./provider/ProvideView";
import ForwardCanvas from "./domain/ForwardCanvas";
import TestingGround from "./domain/testing/TestingGround";
import cameraPosition from "./domain/camera/constants";
import LandingPage from "./domain/landing/LandingPage";
import PreloadImages from "./domain/PreloadImages";

function App() {
  const testing = false;

  return (
    <ProvideView>
      <div id="canvas">
        <ForwardCanvas camera={cameraPosition.original}>
          <Suspense fallback={<></>}>
            <Panorama />
            {testing && <TestingGround />}
            <PreloadImages />
            <OrbitCamera testing />
          </Suspense>
        </ForwardCanvas>
        <LandingPage />
      </div>
    </ProvideView>
  );
}

export default App;
