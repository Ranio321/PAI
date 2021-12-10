import { useView } from "../../../provider/viewContext";
import findViewByName from "../../../utils/findViewByName";
import TransitionHotspot from "./TransitionHotspot";

export default function TransitionHotspots() {
  const { view, changeView } = useView();

  return (
    <>
      {view.hotspots.map((hotspot) => {
        return (
          <TransitionHotspot
            key={hotspot.name}
            position={hotspot.transiitonPoint}
            onClick={() => changeView(findViewByName(hotspot.name))}
          />
        );
      })}
    </>
  );
}
