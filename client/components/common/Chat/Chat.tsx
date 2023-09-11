import "./Chat.scss";

import * as React from "react";

import { ChatContent } from "./ChatContent";
import { ChatHeader } from "./ChatHeader";
import { ChatSection } from "./ChatSection";
import { TextField } from "@mui/material";

export interface IChatProps {}

export function Chat(props: IChatProps) {
  return (
    <div className="dashboard-chat">
      <ChatHeader />

      <ChatContent />

      <ChatSection />
    </div>
  );
}
