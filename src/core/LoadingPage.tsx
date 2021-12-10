import { CSSProperties, useEffect, useState } from "react";
import { useSpring, animated as a } from "react-spring";
import background from "../logo.png";
interface LoadingPageProps {
  onLoadingCompleted: () => any;
}

export default function LoadingPage({ onLoadingCompleted }: LoadingPageProps) {
  const [hide, setHide] = useState(false);

  const style = useSpring({
    height: "100%",
    width: "100%",
    position: "fixed",
    opacity: hide ? 0 : 1,
    top: 0,
    zIndex: 0.9,
    backgroundSize: "100%",
    backgroundColor: "black",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    onRest: () => onLoadingCompleted(),
  });

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 300);
  }, []);

  return (
    <a.div
      className="loading-page"
      style={{ ...style, backgroundImage: `url(${background})` }}
    ></a.div>
  );
}
