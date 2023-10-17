import CallIcon from "@mui/icons-material/Call";
import { Conversation } from "../../../../models";
import { IconButton } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

export interface IHeaderToolProps {
  call: (value: "isVoice" | "isVideo") => void;

  conversation: Conversation;
}

export function HeaderTool({ call, conversation }: IHeaderToolProps) {
  return (
    <div
      className={` flex justify-end ${
        conversation.messages.length === 0 ? "w-full" : "header-tool"
      }`}
    >
      <IconButton
        disabled={conversation.messages.length === 0 ? true : false}
        className="px-4 tool-icon"
      >
        <SearchIcon />
      </IconButton>

      <IconButton
        disabled={conversation.messages.length === 0 ? true : false}
        onClick={() => call("isVoice")}
        className="px-4 tool-icon"
      >
        <CallIcon />
      </IconButton>

      <IconButton
        disabled={conversation.messages.length === 0 ? true : false}
        onClick={() => call("isVideo")}
        className="px-4 tool-icon"
      >
        <VideocamOutlinedIcon />
      </IconButton>

      <IconButton
        disabled={conversation.messages.length === 0 ? true : false}
        className="px-4 tool-icon"
      >
        <PersonOutlineOutlinedIcon />
      </IconButton>

      <IconButton
        disabled={conversation.messages.length === 0 ? true : false}
        className="px-4 tool-icon"
      >
        <MoreHorizOutlinedIcon />
      </IconButton>
    </div>
  );
}
