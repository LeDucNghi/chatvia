import React from "react";
import { UserProfile } from "./auth";

export type Sides = "profile" | "chat" | "group" | "contact" | "setting";

export interface Conversation {
  id: number;
  conversation: string;
  user: UserProfile;
  hasImages?: boolean;
  images?: [{ id: number; img: string }];
}

export interface RecentMessage {
  id: number;
  message: string;
  user: UserProfile;
}

export interface Groups {
  id: number;
  name: string;
  avatar: string;
}

export interface Dropdown {
  id: number;
  icon?: React.ReactNode;
  name: string;
  img?: string;
}

export interface ContactInvite {
  email: string;
  message: string;
}
