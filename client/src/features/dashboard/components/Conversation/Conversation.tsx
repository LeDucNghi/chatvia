import "./Conversation.scss";

import { selectConversations, selectFetching } from "../../dashboardSlice";
import { useEffect, useRef } from "react";

import { ChatItem } from "./Item";
import { ChatItemLoader } from "../../../../components/common/Loader/ChatItemLoder";
import { Images } from "../../../../constants";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { selectUser } from "../../../auth/authSlice";
import { useAppSelector } from "../../../../app/store";

export function Conversation() {
  const bottom = useRef<null | HTMLDivElement>(null);

  const conversations = useAppSelector(selectConversations);
  const fetching = useAppSelector(selectFetching);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    bottom?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chat-content-wrapper w-full p-6 relative flex flex-col overflow-auto">
      {fetching.isConversation ? (
        <ChatItemLoader listToRender={6} />
      ) : conversations.data.messages.length === 0 ? (
        <NotFound
          hasButton={false}
          title="You have never talked to this person before."
          subTitle="Let's get started"
          icon={Images.robot}
          iconStyle={{ width: "200px", height: "200px" }}
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
