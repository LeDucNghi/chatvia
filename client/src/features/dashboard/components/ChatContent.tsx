import "./Chat.scss";

import { selectConversations, selectFetching } from "../dashboardSlice";
import { useEffect, useRef } from "react";

import { ChatItem } from "./ChatItem";
import { ChatItemLoader } from "../../../components/common/Loader/ChatItemLoder";
import { NotFound } from "../../../components/common/NotFound/NotFound";
import { conversationsList } from "../../../mock";
import { useAppSelector } from "../../../app/store";

// import { Conversation } from "../../../models";

export function ChatContent() {
  const bottom = useRef<null | HTMLDivElement>(null);

  const conversations = useAppSelector(selectConversations);
  const fetching = useAppSelector(selectFetching);

  useEffect(() => {
    bottom?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // const [disabledList, setDisabledList] = React.useState<Conversation[]>([]);

  // React.useEffect(() => {
  //   checkIsDuplicate();
  // }, []);

  // const uniqueIds: any[] = [];

  // const unique = conversationsList.filter((element) => {
  //   const isDuplicate = uniqueIds.includes(element.user.id);

  //   if (!isDuplicate) {
  //     uniqueIds.push(element.id);

  //     return true;
  //   }

  //   return false;
  // });

  // const checkIsDuplicate = () => {
  //   const newArr: any[] = [];

  //   unique.forEach((cons) => {
  //     const { id, user } = cons;

  //     const filter = conversationsList.find(
  //       (uni) => uni.id !== id && uni.user.id === user.id
  //     );

  //     newArr.push(filter);

  //     setDisabledList(newArr);
  //   });
  // };

  return (
    <div className="chat-content-wrapper">
      {fetching.isConversation ? (
        <ChatItemLoader listToRender={6} />
      ) : conversations.length === 0 ? (
        <NotFound
          hasButton
          title="Please select a message to see detail. "
          type="component"
        />
      ) : (
        conversationsList.map((cons, key) => {
          // const findCons = disabledList.find((item) => cons.id === item.id);

          return (
            <ChatItem
              key={key}
              hasImages={cons.hasImages}
              userType={cons.user.id === 1 ? "me" : "friend"}
              conversation={cons}
            />
          );
        })
      )}

      <div className="" ref={bottom}></div>
    </div>
  );
}
