import "../components/Side.scss";
import "./Dashboard.scss";

import { Message, Notification, Sides } from "../../../models";
import React, { useEffect } from "react";
import {
  addNewMessage,
  addNewNotify,
  selectLanguage,
  selectMode,
  selectOpenConversation,
  selectPartnerId,
  selectRecentList
} from "../dashboardSlice";
import {
  fetchAllUsersConversation,
  fetchConversation,
  handleGetFriendRequest,
} from "../dashboardThunk";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { AuthenticatedLayout } from "../../../components/layouts/Auth/Authenticate";
import { ChatSide } from "../components/Chat/ChatSide";
import { ContactSide } from "../components/Contact/ContactSide";
import { ConversationMain } from "../components/Conversation/ConversationMain";
import { GroupSide } from "../components/Group/GroupSide";
import { NotificationSide } from "../components/Notifications/NotificationSide";
import { ProfileSide } from "../components/Profile/ProfileSide";
import { RequestSide } from "../components/Request/RequestSide";
import { Seo } from "../../../components/common/Seo/Seo";
import { SideMenu } from "../components/MenuSide";
import { selectUser } from "../../auth/authSlice";
import { socket } from "../../../constants";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const user = useAppSelector(selectUser);
  const mode = useAppSelector(selectMode);
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const openConversation = useAppSelector(selectOpenConversation);
  const partnerId = useAppSelector(selectPartnerId);
  const recentConversation = useAppSelector(selectRecentList);

  const [side, setSide] = React.useState<Sides>("chat");

  useEffect(() => {
    if (partnerId && user) {
      dispatch(fetchConversation(false, [partnerId, String(user?._id)]));
    }
  }, [partnerId, user]);

  useEffect(() => {
    if (user) {
      socket.emit("join-room", {
        recentRooms: recentConversation,
        selfRoom: user._id
      });
    }
  }, [recentConversation, user]);

  useEffect(() => {
    socket.on("receive-message", (data: Message) => {
      console.log("🚀 ~ file: Conversation.tsx:26 ~ socket.on ~ data:", data);

      dispatch(addNewMessage(data))
    });

    socket.on("receive-notify", (data: Notification) => {
      console.log("🚀 ~ socket.on ~ data:", data)

      dispatch(addNewNotify(data))
    })
  }, []);

  useEffect(() => {
    dispatch(handleGetFriendRequest());
    dispatch(fetchAllUsersConversation());
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <AuthenticatedLayout>
      <Seo
        data={{
          title: "Chat | Chatvia",
          description:
            "Chatvia - Your gateway to global communication. Video chat, instant messaging, and voice calls to anyone, anywhere. Stay connected with the world through Chatvia.",
        }}
      />

      <div className="dashboard-container relative w-full flex max-h-screen ">
        <div className="dashboard-side relative justify-between flex flex-row h-screen">
          <SideMenu setSide={setSide} />

          {side === "profile" ? (
            <ProfileSide />
          ) : side === "chat" ? (
            <ChatSide />
          ) : side === "group" ? (
            <GroupSide />
          ) : side === "request" ? (
            <RequestSide />
          ) : side === "notifications" ? (
            <NotificationSide />
          ) : (
            <ContactSide />
          )}
        </div>

        <div
          className={`dashboard-chat h-auto relative ${mode === "dark" && "dark"
            } ${openConversation ? "active" : ""} `}
        >
          <ConversationMain />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
