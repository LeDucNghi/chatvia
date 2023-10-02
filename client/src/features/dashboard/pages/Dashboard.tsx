import "../components/Side.scss";
import "./Dashboard.scss";

import { Message, Sides, UserProfile } from "../../../models";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { AuthenticatedLayout } from "../../../components/layouts/Auth/Authenticate";
import { ChatSide } from "../components/Chat/ChatSide";
import { ContactSide } from "../components/Contact/ContactSide";
import { Content } from "../components/Conversation/Content";
import { GroupSide } from "../components/Group/GroupSide";
import { Header } from "../components/Conversation/Header";
import { ProfileSide } from "../components/Profile/ProfileSide";
import { RequestSide } from "../components/Request/RequestSide";
import { Section } from "../components/Conversation/Section";
import { Seo } from "../../../components/common/Seo/Seo";
import { SideMenu } from "../components/MenuSide";
import { addNewMessage } from "../dashboardSlice";
import { fetchConversation } from "../dashboardThunk";
import { selectUser } from "../../auth/authSlice";
import { subscribeChannel } from "../../../utils";

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

  useEffect(() => {
    const messageChannel = subscribeChannel("message");

    messageChannel.bind("my-event", (data: Message) => {
      console.log("messages: ", data);

      dispatch(addNewMessage(data));
    });
  }, []);

  useEffect(() => {
    const friendRequestChannel = subscribeChannel("friend-request");

    friendRequestChannel.bind(`${user?._id}`, (data: UserProfile) => {
      console.log("messages: ", data);

      // dispatch(addNewMessage(data));
    });
  }, [user?._id]);

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
          ) : (
            <ContactSide />
          )}
        </div>

        <div className="dashboard-chat h-screen w-8/12">
          <Header />

          <Content />

          <Section partnerId={curChatRoom} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
