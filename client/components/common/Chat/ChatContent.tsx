import * as React from "react";

import { ChatItem } from "./ChatItem";

export interface IChatContentProps {}

export function ChatContent(props: IChatContentProps) {
  return (
    <div className="chat-content-wrapper">
      <ChatItem userType="friend" />
    </div>
  );
}
