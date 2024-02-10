import useAuth from "@/hooks/useAuth";
import Navbar from "@/components/organims/Navbar";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const auth = useAuth();

  return auth ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default Protected;
