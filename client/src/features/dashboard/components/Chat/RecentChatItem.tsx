import { AvatarBadge } from "../../../../components/common/Avatar/AvatarBadge";
import { Badge } from "../../../../components/common/Badge/Badge";
import { Button } from "@mui/material";
import { RecentMessage } from "../../../../models";
import { selectMode } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export interface IRecentChatItemProps {
  message: RecentMessage;

  isSelected: boolean;

  onClick: (id: string, partnerId: string) => void;
}

export function RecentChatItem({
  message,
  isSelected,
  onClick,
}: IRecentChatItemProps) {
  const mode = useAppSelector(selectMode);

  return (
    <Button
      onClick={() => onClick(message._id, message.sender._id!)}
      className={
        isSelected
          ? `chat-recent-item isActive ${mode === "dark" ? "dark" : ""}`
          : "chat-recent-item"
      }
    >
      <div className="w-full h-full flex justify-between items-center">
        <AvatarBadge
          alt={message.sender.username}
          status={message.status}
          avatar={message.sender.avatar!}
        />

        <div className="recent-msg text-left">
          <h5
            className={` font-semibold ${
              mode === "dark" ? "text-white" : "text-black"
            }`}
          >
            {message.sender.username}{" "}
          </h5>
          <p className=" text-gray-400">{message.message} </p>
        </div>

        <div className="text-gray-300 flex items-end flex-col">
          02:50pm
          <Badge content={10} />
        </div>
      </div>
    </Button>
  );
}
