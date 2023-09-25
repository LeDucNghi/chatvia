import Dashboard from "../features/dashboard/pages/Dashboard";
import Forgot from "../features/auth/pages/Forgot";
import { NotFound } from "../components/common/NotFound/NotFound";
import { ResetPassword } from "../features/auth/pages/ResetPassword";
import SignIn from "../features/auth/pages/SignIn";
import SignUp from "../features/auth/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SignIn,
  },

  {
    path: "/signup",
    Component: SignUp,
  },

  {
    path: "/forgot",
    Component: Forgot,
  },

  {
    path: "/reset/:email",
    Component: ResetPassword,
  },

  {
    path: "/dashboard",
    Component: Dashboard,
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
