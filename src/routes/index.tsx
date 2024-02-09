import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Protected = lazy(() => import("@/components/templates/Protected"));

const Login = lazy(() => import("@/components/pages/Login"));
const Register = lazy(() => import("@/components/pages/Register"));

const Dashboard = lazy(() => import("@/components/pages/Dashboard"));
const CreateUser = lazy(() => import("@/components/pages/CreateUser"))

const Routes = () => {
  return useRoutes([
    {
      element: <Protected />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/user/create",
          element: <CreateUser />,
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
