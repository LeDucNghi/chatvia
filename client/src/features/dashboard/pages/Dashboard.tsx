import "../components/Side.scss";
import "./Dashboard.scss";

import { FriendRequest, Message, Sides } from "../../../models";
import React, { useEffect } from "react";
import {
  addNewMessage,
  addNewRequest,
  selectLanguage,
  selectMode,
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
import { subscribeChannel } from "../../../utils";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const user = useAppSelector(selectUser);
  const mode = useAppSelector(selectMode);
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const [side, setSide] = React.useState<Sides>("chat");
  const [curChatRoom, setCurChatRoom] = React.useState<string>("");

  useEffect(() => {
    if (curChatRoom && user) {
      dispatch(fetchConversation(false, [curChatRoom, String(user?._id)]));
    }
  }, [curChatRoom, user]);

  useEffect(() => {
    const messageChannel = subscribeChannel("message");

    messageChannel.bind("my-event", (data: Message) => {
      console.log("messages: ", data);

      dispatch(addNewMessage(data));
    });
  }, []);

  useEffect(() => {
    const friendRequestChannel = subscribeChannel("friend-request");

    friendRequestChannel.bind(`${user?._id}`, (data: FriendRequest) => {
      console.log("messages: ", data);

      dispatch(addNewRequest(data));
    });
  }, [user?._id]);

  useEffect(() => {
    dispatch(handleGetFriendRequest());
  }, [dispatch]);

  useEffect(() => {
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
            <ChatSide curChatRoom={setCurChatRoom} />
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
          className={`dashboard-chat h-auto  relative ${
            mode === "dark" && "dark"
          }`}
        >
          <ConversationMain />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
