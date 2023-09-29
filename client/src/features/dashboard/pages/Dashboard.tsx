import "../components/Chat.scss";
import "../components/Side.scss";
import "./Dashboard.scss";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { AuthenticatedLayout } from "../../../components/layouts/Auth/Authenticate";
import { ChatContent } from "../components/ChatContent";
import { ChatHeader } from "../components/ChatHeader";
import { ChatSection } from "../components/ChatSection";
import { ChatSide } from "../components/ChatSide";
import { ContactSide } from "../components/ContactSide";
import { GroupSide } from "../components/GroupSide";
import { ProfileSide } from "../components/ProfileSide";
import { RequestSide } from "../components/RequestSide";
import { Seo } from "../../../components/common/Seo/Seo";
import { SideMenu } from "../components/MenuSide";
import { Sides } from "../../../models";
import { fetchConversation } from "../dashboardThunk";
import { selectUser } from "../../auth/authSlice";

export default function Dashboard() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [side, setSide] = React.useState<Sides>("chat");
  const [curChatRoom, setCurChatRoom] = React.useState<string>(
    "6509523b3693bf258f8467f0"
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchConversation(false, [curChatRoom, String(user?._id)]));
    }
  }, [curChatRoom, user]);

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
            <ChatSide curChatRoom={setCurChatRoom} />
          ) : side === "group" ? (
            <GroupSide />
          ) : side === "request" ? (
            <RequestSide />
          ) : (
            <ContactSide />
          )}
        </div>

        <div className="dashboard-chat">
          <ChatHeader />

          <ChatContent />

          <ChatSection partnerId={curChatRoom} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
