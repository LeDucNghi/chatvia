import { Conversation, Message, UserProfile } from "../../../../models";
import { onOpenConversation, selectMode } from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { useEffect, useState } from "react";

import { AvatarBadge } from "../../../../components/common/Avatar/AvatarBadge";
import { Badge } from "../../../../components/common/Badge/Badge";
import { Button } from "@mui/material";
import moment from "moment";
import { selectUser } from "../../../auth/authSlice";

export interface IRecentChatItemProps {
  conversation: Conversation;

  isSelected: boolean;

  onClick: (id: string, partnerId: string) => void;
}

export function RecentChatItem({
  conversation,
  isSelected,
  onClick,
}: IRecentChatItemProps) {
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectMode);
  const me = useAppSelector(selectUser)

  const [receiver, setReceiver] = useState<UserProfile | null>(null);
  const [lastMsg, setLastMsg] = useState<Message | null>(null);

  useEffect(() => {
    if (conversation) {
      const findReceiver = conversation.participant.find((user) => user._id !== me?._id)
      const lastMessage = conversation.messages.slice(-1)

      setReceiver(findReceiver!)
      setLastMsg(lastMessage![0])
    }
  }, [conversation]);

  const handleOpenConversation = () => {
    dispatch(onOpenConversation(true));
    onClick(conversation._id, lastMsg!.sender!._id!);
  };

  return (
    <>
      {conversation.messages.length === 0 ? null : (
        <Button
          onClick={handleOpenConversation}
          className={
            isSelected
              ? `chat-recent-item isActive ${mode === "dark" ? "dark" : ""}`
              : "chat-recent-item"
          }
        >
          <div className="w-full h-full flex justify-between items-center">
            <AvatarBadge
              alt={receiver?.username}
              status={"online"}
              avatar={receiver?.avatar}
            />

            <div className="recent-msg text-left w-3/5 ">
              <h5
                className={`font-semibold ${mode === "dark" ? "text-white" : "text-black"
                  }`}
              >
                {receiver?.username}{" "}
              </h5>

              <p className=" text-gray-400">
                {lastMsg?.sender?._id === me?._id ? "You:" : `${receiver?.username}:`} {lastMsg?.message}
              </p>
            </div>

            <div className="text-gray-300 flex items-end flex-col ">
              {moment(lastMsg?.timeStamp).format("LT")}

              <Badge content={10} />
            </div>
          </div>
        </Button>
      )}
    </>
  );
}
