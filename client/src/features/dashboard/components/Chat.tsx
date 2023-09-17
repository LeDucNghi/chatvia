import "./Chat.scss";

import { ChatContent } from "./ChatContent";
import { ChatHeader } from "./ChatHeader";
import { ChatSection } from "./ChatSection";

export function Chat() {
  return (
    <div className="dashboard-chat">
      <ChatHeader />

      <ChatContent />

      <ChatSection />
    </div>
  );
}
