import "./Chat.scss";

import { selectConversations, selectFetching } from "../dashboardSlice";
import { useEffect, useRef } from "react";

import { ChatItem } from "./ChatItem";
import { ChatItemLoader } from "../../../components/common/Loader/ChatItemLoder";
import { Message } from "../../../models";
import NotFound from "../../../components/common/NotFound/NotFound";
import Pusher from "pusher-js";
import { selectUser } from "../../auth/authSlice";
import { useAppSelector } from "../../../app/store";

export function ChatContent() {
  const bottom = useRef<null | HTMLDivElement>(null);

  const conversations = useAppSelector(selectConversations);

  const fetching = useAppSelector(selectFetching);
  const user = useAppSelector(selectUser);

  // const [conversationList, setConversationList] = useState(
  //   conversations?.data.messages
  // );

  useEffect(() => {
    bottom?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("bd7b197e7fcf1ef09586", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", (data: Message) => {
      console.log("messages: ", data);

      // setConversationList((list) => [...list!, data]);
    });
  }, []);

  // const [disabledList, setDisabledList] = React.useState<Conversation[]>([]);

  // React.useEffect(() => {
  //   checkIsDuplicate();
  // }, []);

  // const uniqueIds: any[] = [];

  // const unique = conversation.filter((element) => {
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

  //     const filter = conversation.find(
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
      ) : conversations?.data.messages.length === 0 ? (
        <NotFound
          hasButton
          title="Please select a message to see detail. "
          type="component"
        />
      ) : (
        conversations?.data.messages.map((cons, key) => {
          // const findCons = disabledList.find((item) => cons.id === item.id);

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
