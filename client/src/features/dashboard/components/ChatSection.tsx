import "./Chat.scss";

import { IconButton, TextField } from "@mui/material";
import { addNewMessage, selectConversations } from "../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useEffect, useState } from "react";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { Message } from "../../../models";
import Pusher from "pusher-js";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { sendMsg } from "../dashboardThunk";

export interface IChatSectionProps {
  partnerId: string;
}

export function ChatSection({ partnerId }: IChatSectionProps) {
  const dispatch = useAppDispatch();
  const conversation = useAppSelector(selectConversations);

  const pusher = new Pusher("bd7b197e7fcf1ef09586", {
    cluster: "ap1",
  });

  const channel = pusher.subscribe("my-channel");

  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    channel.bind("my-event", (data: Message) => {
      console.log("messages: ", data);

      dispatch(addNewMessage(data));
    });
  }, []);

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
