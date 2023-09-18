import { AvatarBadge } from "../../../components/common/Avatar/AvatarBadge";
import { Badge } from "../../../components/common/Badge/Badge";
import { Button } from "@mui/material";
import { RecentMessage } from "../../../models";

export interface IRecentChatItemProps {
  message: RecentMessage;

  isSelected: boolean;

  onClick: (id: number) => void;
}

export function RecentChatItem({
  message,
  isSelected,
  onClick,
}: IRecentChatItemProps) {
  return (
    <Button
      onClick={() => onClick(message.id)}
      className={isSelected ? "chat-recent-item isActive" : "chat-recent-item"}
    >
      <div className="w-full h-full flex justify-between items-center">
        <AvatarBadge
          alt={message.user.username}
          status={message.status}
          avatar={message.user.avatar!}
        />

        <div className="recent-msg text-left">
          <h5 className="text-black font-semibold">{message.user.username} </h5>
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
