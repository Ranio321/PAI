import { useState } from "react";
import { View } from "../views/types";
import { defaultView } from "../views/views";
import { ViewContext, viewContext } from "./viewContext";

interface ProvideViewProps {
  children: JSX.Element;
}

export default function ProvideView(props: ProvideViewProps) {
  const { children } = props;
  const Provider = viewContext.Provider;
  const { ...values } = useViewer();

  return <Provider value={values}>{children}</Provider>;
}

function useViewer(): ViewContext {
  const [view, setView] = useState(defaultView);

  function changeView(view: View) {
    if (view) {
      setView(view);
    }
  }

  return { view, changeView };
}
