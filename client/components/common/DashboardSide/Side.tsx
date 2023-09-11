import "./Side.scss";

import * as React from "react";

import { ChatSide } from "./ChatSide";
import { ContactSide } from "./ContactSide";
import { GroupSide } from "./GroupSide";
import { ProfileSide } from "./ProfileSide";
import { Sides } from "@/models";

export interface ISidesProps {
  sides: Sides;
}

export function Side({ sides }: ISidesProps) {
  return (
    <div className="dashboard-info">
      {sides === "profile" ? (
        <ProfileSide />
      ) : sides === "chat" ? (
        <ChatSide />
      ) : sides === "group" ? (
        <GroupSide />
      ) : (
        <ContactSide />
      )}
    </div>
  );
}
