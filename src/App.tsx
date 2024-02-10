import Routes from "@/routes";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/components/molecules/PageLoader";

function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes />
      </Suspense>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
