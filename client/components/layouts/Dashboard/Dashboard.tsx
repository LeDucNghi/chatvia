"use client";

import "./Dashboard.scss";

import * as React from "react";

import { Sides, UserProfile } from "@/models";

import { AuthenticatedLayout } from "../Auth/Authenticate";
import { Chat } from "@/components/common/Chat/Chat";
import { Side } from "@/components/common/DashboardSide/Side";
import { SideMenu } from "@/components/common/DashboardSide/MenuSide";

export interface IDashboardProps {
  window?: () => Window;

  user?: UserProfile;
  friend?: UserProfile;
  children?: React.ReactNode;
}

const drawerWidth = 240;

export function Dashboard({ window, children, user }: IDashboardProps) {
  const [side, setSide] = React.useState<Sides>("profile");

  return (
    <AuthenticatedLayout>
      <div className="dashboard-container ">
        <div className="dashboard-side">
          <SideMenu setSide={setSide} />

          <Side sides={side} />
        </div>

        <Chat />
      </div>
    </AuthenticatedLayout>
  );
}
