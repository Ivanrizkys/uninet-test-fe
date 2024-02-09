import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Protected = lazy(() => import("@/components/templates/Protected"));

const Login = lazy(() => import("@/components/pages/Login"));
const Register = lazy(() => import("@/components/pages/Register"));

const Dashboard = lazy(() => import("@/components/pages/Dashboard"));

const Routes = () => {
  return useRoutes([
    {
      element: <Protected />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
  ]);
};

export default Routes;
