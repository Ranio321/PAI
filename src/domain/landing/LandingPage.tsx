import { useState } from "react";
import LoadingPage from "../../core/LoadingPage";

export default function LandingPage() {
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  return (
    <>
      {!loadingCompleted && (
        <LoadingPage onLoadingCompleted={() => setLoadingCompleted(true)} />
      )}
    </>
  );
}
