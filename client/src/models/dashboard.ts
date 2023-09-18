import { UserProfile } from "./auth";

export type Sides = "profile" | "chat" | "group" | "contact" | "setting";

export type Mode = "dark" | "light";

export type Language = "vietnamese" | "english";

export interface DashboardState {
  fetching: {
    isConversation: boolean;
    isFriendList: boolean;
  };

  conversations: Conversation[];
  friends: UserProfile[];

  mode: "dark" | "light";
  languages: "vietnamese" | "english";
}

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
  status: "online" | "leave" | "off";
}

export interface Groups {
  id: number;
  name: string;
  avatar: string;
}

export interface Dropdown {
  id: number;
  icon?: string;
  name: string;
  img?: string;
}

export interface ContactInvite {
  email: string;
  message: string;
}
