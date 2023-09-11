import "./Chat.scss";

import * as React from "react";

import { IconButton, TextField } from "@mui/material";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

export interface IChatSectionProps {}

export function ChatSection(props: IChatSectionProps) {
  return (
    <div className="chat-input-section flex items-center justify-between">
      <TextField
        variant="outlined"
        placeholder="Enter Message..."
        className="textfield"
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

        <IconButton className="tool-icon send-icon">
          <SendOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}
