import * as React from "react";

import { Navigate } from "react-router-dom";
import { cookies } from "../../../utils";

export interface IAuthenticatedProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: IAuthenticatedProps) {
  const isLoggedIn = cookies.getCookie("user");

  if (!isLoggedIn) return <Navigate to="/" replace />;
  else return <>{children}</>;
}
