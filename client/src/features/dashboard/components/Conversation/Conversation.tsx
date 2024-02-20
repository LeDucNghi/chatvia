import "./Conversation.scss";

import { selectConversations, selectFetching } from "../../dashboardSlice";
import { useEffect, useRef } from "react";

import { ChatItem } from "./Item";
import { ChatItemLoader } from "../../../../components/common/Loader/ChatItemLoader";
import { Images } from "../../../../constants";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { useAppSelector } from "../../../../app/store";

export function Conversation() {
  const bottom = useRef<null | HTMLDivElement>(null);

  const conversations = useAppSelector(selectConversations);
  console.log("🚀 ~ Conversation ~ conversations:", conversations)
  const fetching = useAppSelector(selectFetching);

  useEffect(() => {
    bottom?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chat-content-wrapper w-full p-6 relative flex flex-col overflow-auto">
      {fetching.isConversation ? (
        <ChatItemLoader listToRender={6} />
      ) : !conversations || conversations.messages?.length === 0 ? (
        <NotFound
          hasButton={false}
          title="Choose any user to see the conversation or get started to chat with them."
          icon={Images.robot}
          iconStyle={{ width: "200px", height: "200px" }}
        />
      ) : (
        conversations.messages?.map((cons, key) => {
          return (
            <ChatItem
              key={key}
              hasImages={cons.hasImages}
              sender={cons.sender!}
              message={cons}
            />
          );
        })
      )}

      <div className="" ref={bottom}></div>
    </div>
  );
}
