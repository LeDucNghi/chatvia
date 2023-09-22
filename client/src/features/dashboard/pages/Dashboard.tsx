import "../components/Chat.scss";
import "../components/Side.scss";
import "./Dashboard.scss";

import React, { useEffect } from "react";

import { AuthenticatedLayout } from "../../../components/layouts/Auth/Authenticate";
import { ChatContent } from "../components/ChatContent";
import { ChatHeader } from "../components/ChatHeader";
import { ChatSection } from "../components/ChatSection";
import { ChatSide } from "../components/ChatSide";
import { ContactSide } from "../components/ContactSide";
import { GroupSide } from "../components/GroupSide";
import { ProfileSide } from "../components/ProfileSide";
import { Seo } from "../../../components/common/Seo/Seo";
import { SideMenu } from "../components/MenuSide";
import { Sides } from "../../../models";
import { getConversation } from "../dashboardThunk";
import { useAppDispatch } from "../../../app/store";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const [side, setSide] = React.useState<Sides>("chat");
  // const [curChatRoom, setCurChatRoom] = React.useState<string>("");

  useEffect(() => {
    dispatch(getConversation("650da4ff60dbd1a34280f0c8", false));
  }, [dispatch]);

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
