import { useEffect, useState } from "react";
import views from "../views/views";
import HelperView from "./panorama/HelperView";

export default function PreloadImages() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 200);
  }, []);

  return (
    <>
      {show &&
        views.map((view) => (
          <HelperView key={view.name + "preload"} view={view} />
        ))}
    </>
  );
}
