import "./Dashboard.scss";

import * as React from "react";

import { AuthenticatedLayout } from "../Auth/Authenticate";
import { ChatContent } from "../../../features/dashboard/components/ChatContent";
import { ChatHeader } from "../../../features/dashboard/components/ChatHeader";
import { ChatSection } from "../../../features/dashboard/components/ChatSection";
import { ChatSide } from "../../../features/dashboard/components/ChatSide";
import { ContactSide } from "../../../features/dashboard/components/ContactSide";
import { GroupSide } from "../../../features/dashboard/components/GroupSide";
import { ProfileSide } from "../../../features/dashboard/components/ProfileSide";
import { SideMenu } from "../../../features/dashboard/components/MenuSide";
import { Sides } from "../../../models";

// export interface IDashboardProps {
//   user?: UserProfile;
//   friend?: UserProfile;
//   children?: React.ReactNode;
// }

export function Dashboard() {
  const [side, setSide] = React.useState<Sides>("contact");

  return (
    <AuthenticatedLayout>
      <div className="dashboard-container relative w-full flex ">
        <div className="dashboard-side">
          <SideMenu setSide={setSide} />

          {side === "profile" ? (
            <ProfileSide />
          ) : side === "chat" ? (
            <ChatSide />
          ) : side === "group" ? (
            <GroupSide />
          ) : (
            <ContactSide />
          )}
        </div>

        <div className="dashboard-chat">
          <ChatHeader />

          <ChatContent />

          <ChatSection />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
