import React from "react";
import { useContext } from "react";
import { View } from "../views/types";
import { defaultView } from "../views/views";

export interface ViewContext {
  view: View;
  changeView: (view: View) => any;
}
export const viewContext = React.createContext<ViewContext>({
  changeView: () => null,
  view: defaultView,
});

export const useView = () => {
  return useContext(viewContext);
};
