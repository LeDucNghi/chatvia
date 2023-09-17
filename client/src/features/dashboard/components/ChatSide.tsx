import "./Side.scss";

import { recentMessage, users } from "../../../mock";

import { Carousel } from "../../../components/common/Carousel/Carousel";
import ChatIcon from "@mui/icons-material/Chat";
import { InputField } from "../../../components/common/InputField/InputField";
import { RecentChatItem } from "./RecentChatItem";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "./SideWrapper";

export function ChatSide() {
  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value
    );
  };

  return (
    <SideWrapper
      title="chats"
      icon={<ChatIcon />}
      header={
        <InputField
          onChange={handleFieldChange}
          type="email"
          label="Find users"
          prependIcon={<SearchIcon />}
          autoFocus={false}
        />
      }
    >
      <div className="chat-user-onine mt-3 mb-6">
        <Carousel option={users} />
      </div>

      <div className="chat-recent w-full h-full">
        <h5 className="mb-4 font-semibold">Recent</h5>

        <div className="chat-recent-list p-2 w-full ">
          {recentMessage.map((msg, key) => {
            return <RecentChatItem key={key} message={msg} />;
          })}
        </div>
      </div>
    </SideWrapper>
  );
}
