import { View } from "../views/types";
import views, { defaultView } from "../views/views";

export default function findViewByName(name: string): View{
    const view = views.find((view) => view.name === name);
    return view ? view : defaultView ;
  }