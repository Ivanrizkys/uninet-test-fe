import Routes from "@/routes";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Suspense>
        <Routes />
      </Suspense>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
