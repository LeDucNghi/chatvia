import "./Side.scss";

import { recentMessage, users } from "../../../mock";

import { BaseItemLoader } from "../../../components/common/Loader/BaseItemLoader";
import { Carousel } from "../../../components/common/Carousel/Carousel";
import ChatIcon from "@mui/icons-material/Chat";
import { InputField } from "../../../components/common/InputField/InputField";
import { RecentChatItem } from "./RecentChatItem";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "./SideWrapper";
import { selectFetching } from "../dashboardSlice";
import { useAppSelector } from "../../../app/store";
import { useState } from "react";

export interface IChatSideProps {
  curChatRoom?: (value: string) => void;
}

export function ChatSide({ curChatRoom }: IChatSideProps) {
  const fetching = useAppSelector(selectFetching);

  const [isSelected, setIsSelected] = useState(0);

  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value
    );
  };

  const onItemChange = (id: number, partnerId: number) => {
    setIsSelected(id);

    if (curChatRoom) {
      curChatRoom(String(partnerId));
    }
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
          {fetching.isConversation ? (
            <BaseItemLoader listToRender={4} />
          ) : (
            recentMessage.map((msg, key) => {
              return (
                <RecentChatItem
                  onClick={onItemChange}
                  isSelected={msg._id === isSelected}
                  key={key}
                  message={msg}
                />
              );
            })
          )}
        </div>
      </div>
    </SideWrapper>
  );
}
