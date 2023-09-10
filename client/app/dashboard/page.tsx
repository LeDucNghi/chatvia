"use client";

import * as React from "react";

import { AuthenticatedLayout } from "@/components/layouts/Auth/Authenticate";
import { Dashboard } from "@/components/layouts/Dashboard/Dashboard";
import { UserProfile } from "@/models";
import { cookies } from "@/utils";
import { redirect } from "next/navigation";
import { socket } from "@/constants";

export interface IpageProps {}

export default function DashboardPage(props: IpageProps) {
  const joinRoom = () => {
    socket.emit("join_room");
  };

  const user = cookies.getCookie("user");

  return <Dashboard>dashboard page</Dashboard>;
}
