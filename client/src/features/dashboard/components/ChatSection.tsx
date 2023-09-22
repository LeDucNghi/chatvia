import "./Chat.scss";

import { IconButton, TextField } from "@mui/material";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { socket } from "../../../constants";
import { useState } from "react";

export function ChatSection() {
  const [msg, setMsg] = useState<string>("");

  const handleSendMessage = () => {
    socket.emit("send-msg", {
      room: "chatvia",
      msg: msg,
    });
  };

  return (
    <div className="chat-input-section flex items-center justify-between">
      <TextField
        id="outlined-basic"
        type="text"
        variant="outlined"
        label="Enter Message"
        placeholder="Your Message..."
        className="textfield"
        autoComplete="off"
        // disabled={fetching.isConversation ? true : false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMsg(e.target.value)
        }
      />

      <div className="chat-input-tool ">
        <IconButton className="tool-icon">
          <EmojiEmotionsOutlinedIcon />
        </IconButton>

        <IconButton className="tool-icon">
          <AttachFileOutlinedIcon />
        </IconButton>

        <IconButton className="tool-icon">
          <BrokenImageOutlinedIcon />
        </IconButton>

        <IconButton
          // disabled={fetching.isConversation ? true : false}
          className="tool-icon send-icon"
          onClick={() => handleSendMessage()}
        >
          <SendOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}
