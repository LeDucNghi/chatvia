import "./Dashboard.scss";
import "../components/Chat.scss";
import "../components/Side.scss";

import { AuthenticatedLayout } from "../../../components/layouts/Auth/Authenticate";
import { ChatContent } from "../components/ChatContent";
import { ChatHeader } from "../components/ChatHeader";
import { ChatSection } from "../components/ChatSection";
import { ChatSide } from "../components/ChatSide";
import { ContactSide } from "../components/ContactSide";
import { GroupSide } from "../components/GroupSide";
import { ProfileSide } from "../components/ProfileSide";
import React from "react";
import { Seo } from "../../../components/common/Seo/Seo";
import { SideMenu } from "../components/MenuSide";
import { Sides } from "../../../models";

export default function Dashboard() {
  const [side, setSide] = React.useState<Sides>("chat");

  return (
    <AuthenticatedLayout>
      <Seo
        data={{
          title: "Chat | Chatvia",
          description:
            "Chatvia - Your gateway to global communication. Video chat, instant messaging, and voice calls to anyone, anywhere. Stay connected with the world through Chatvia.",
        }}
      />

      <div className="dashboard-container relative w-full flex max-h-screen">
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
