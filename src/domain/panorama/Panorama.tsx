import { useRef, useState } from "react";
import { MeshBasicMaterialProps, useFrame } from "react-three-fiber";
import { useView } from "../../provider/viewContext";
import findViewByName from "../../utils/findViewByName";
import views from "../../views/views";
import HelperView from "./HelperView";
import PanoramicView from "./PanoramicView";

export default function Panorama() {
  const { view, changeView } = useView();
  const [prevView, setPrevView] = useState(view);
  const mainViewRef = useRef<MeshBasicMaterialProps>(null);
  const helperViewRef = useRef<MeshBasicMaterialProps>(null);

  function toggleTransition(viewName: string) {
    const view = views.find((x) => x.name === viewName);

    if (mainViewRef.current?.opacity === 1 && view) {
      changeView(view);
    }
  }

  useFrame(() => {
    if (view.name !== prevView.name) {
      if (helperViewRef.current && mainViewRef.current?.opacity) {
        const mainViewopacity = mainViewRef.current?.opacity;
        mainViewRef.current.opacity = mainViewopacity - 0.02;
        helperViewRef.current.opacity = 1 - mainViewRef.current.opacity;

        if (mainViewRef.current.opacity < 0) {
          mainViewRef.current.opacity = 1;
          helperViewRef.current.opacity = 0;
          setPrevView(view);
        }
      }
    }
  });

  const shouldShowMainView = () => mainViewRef.current?.opacity === 1;

  return (
    <>
      <PanoramicView
        view={view}
        keyDown={toggleTransition}
        visible={shouldShowMainView()}
        transition={view.name !== prevView.name}
      />
      {prevView.hotspots.map((x) => {
        return (
          <HelperView
            ref={x.name === view.name ? helperViewRef : null}
            key={x.name}
            view={findViewByName(x.name)}
            opacity={0}
            visible={!shouldShowMainView()}
          />
        );
      })}
      <HelperView ref={mainViewRef} view={prevView} opacity={1} />
    </>
  );
}
