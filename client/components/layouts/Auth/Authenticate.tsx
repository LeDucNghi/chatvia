import * as React from "react";

import { cookies } from "@/utils";
import { redirect } from "next/navigation";
import { selectSignedIn } from "@/store/features/auth";
import { useAppSelector } from "@/store/store";

export interface IAuthenticatedProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: IAuthenticatedProps) {
  const isLoggedIn = useAppSelector(selectSignedIn);

  if (!isLoggedIn) return redirect("/signin");
  else return <>{children}</>;
}
