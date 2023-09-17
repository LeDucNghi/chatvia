import { Avatar, Button } from "@mui/material";

import { Badge } from "../../../components/common/Badge/Badge";
import { RecentMessage } from "../../../models";

export interface IRecentChatItemProps {
  message: RecentMessage;
}

export function RecentChatItem({ message }: IRecentChatItemProps) {
  return (
    <Button className="chat-recent-item">
      <div className="flex justify-between items-center">
        <Avatar alt="Remy Sharp" src={message.user.avatar} />

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
