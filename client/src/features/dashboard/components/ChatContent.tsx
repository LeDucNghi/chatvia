import "./Chat.scss";

import { selectConversations, selectFetching } from "../dashboardSlice";
import { useEffect, useRef } from "react";

import { ChatItem } from "./ChatItem";
import { ChatItemLoader } from "../../../components/common/Loader/ChatItemLoder";
import { Images } from "../../../constants";
import NotFound from "../../../components/common/NotFound/NotFound";
import { selectUser } from "../../auth/authSlice";
import { useAppSelector } from "../../../app/store";

export function ChatContent() {
  const bottom = useRef<null | HTMLDivElement>(null);

  const conversations = useAppSelector(selectConversations);
  const fetching = useAppSelector(selectFetching);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    bottom?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chat-content-wrapper w-full p-6 flex flex-col overflow-auto h-[530px]">
      {fetching.isConversation ? (
        <ChatItemLoader listToRender={6} />
      ) : !conversations ? (
        <NotFound
          hasButton={false}
          title="You have never talked to this person before. Let's get started"
          icon={Images.mailbox}
        />
      ) : (
        conversations.data.messages.map((cons, key) => {
          return (
            <ChatItem
              key={key}
              hasImages={cons.hasImages}
              userType={cons.sender?._id === user?._id ? "me" : "friend"}
              message={cons}
            />
          );
        })
      )}

      <div className="" ref={bottom}></div>
    </div>
  );
}
