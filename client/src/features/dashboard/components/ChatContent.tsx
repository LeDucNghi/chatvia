import "./Chat.scss";

import { ChatItem } from "./ChatItem";
import { conversationsList } from "../../../mock";

// import { Conversation } from "../../../models";

export function ChatContent() {
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
      {conversationsList.map((cons, key) => {
        // const findCons = disabledList.find((item) => cons.id === item.id);

        return (
          <ChatItem
            key={key}
            hasImages={cons.hasImages}
            userType={cons.user.id === 1 ? "me" : "friend"}
            conversation={cons}
          />
        );
      })}
    </div>
  );
}
