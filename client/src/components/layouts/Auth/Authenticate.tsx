import * as React from "react";

import { Navigate } from "react-router-dom";
import { cookies } from "../../../utils";
import { socket } from "../../../constants";

export interface IAuthenticatedProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: IAuthenticatedProps) {
  const isLoggedIn = cookies.getCookie("user");

  React.useEffect(() => {
    if (isLoggedIn) {
      socket.connect();
      socket.emit("chat-via", "chatvia");
    } else {
      socket.disconnect();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Navigate to="/" />;
  else return <>{children}</>;
}
