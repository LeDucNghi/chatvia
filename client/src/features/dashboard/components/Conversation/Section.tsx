import "./Conversation.scss";

import { IconButton, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { selectConversations } from "../../dashboardSlice";
import { sendMsg } from "../../dashboardThunk";
import { useState } from "react";

export interface ISectionProps {
  partnerId: string;
}

export function Section({ partnerId }: ISectionProps) {
  const dispatch = useAppDispatch();
  const conversation = useAppSelector(selectConversations);

  const [msg, setMsg] = useState<string>("");

  const handleSendMessage = () => {
    dispatch(
      sendMsg({
        consId: conversation?.data._id,
        partnerId: partnerId,
        message: msg,
      })
    );

    setMsg("");
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
        value={msg}
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
