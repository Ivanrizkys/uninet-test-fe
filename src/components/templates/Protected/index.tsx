// import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/organims/Navbar";

// interface ProtectedProps {
//   children: ReactNode;
// }

function Protected() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Protected;
