import "./Chat.scss";

import { IconButton, TextField } from "@mui/material";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { selectFetching } from "../dashboardSlice";
import { useAppSelector } from "../../../app/store";

export function ChatSection() {
  const fetching = useAppSelector(selectFetching);

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
        disabled={fetching.isConversation ? true : false}
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
          disabled={fetching.isConversation ? true : false}
          className="tool-icon send-icon"
        >
          <SendOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}
