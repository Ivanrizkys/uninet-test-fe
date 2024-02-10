import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Protected = lazy(() => import("@/components/templates/Protected"));

const Login = lazy(() => import("@/components/pages/Login"));
const Register = lazy(() => import("@/components/pages/Register"));

const Filter = lazy(() => import("@/components/pages/Filter"));
const Dashboard = lazy(() => import("@/components/pages/Dashboard"));
const CreateUser = lazy(() => import("@/components/pages/CreateUser"));
const EditUser = lazy(() => import("@/components/pages/EditUser"));
const DetailUser = lazy(() => import("@/components/pages/DetailUser"));

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
        {
          path: "/user/edit/:id",
          element: <EditUser />,
        },
        {
          path: "/user/:id",
          element: <DetailUser />,
        },
        {
          path: "/filter",
          element: <Filter />,
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
