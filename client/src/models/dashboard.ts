import { UserProfile } from "./auth";

export type Sides = "profile" | "chat" | "group" | "contact" | "setting";

export type Mode = "dark" | "light";

export type Language = "vietnamese" | "english";

export interface DashboardState {
  fetching: {
    isConversation: boolean;
    isFriendList: boolean;
  };

  conversations: Message[];
  friends: UserProfile[];

  mode: Mode;
  languages: Language;
}

export interface Message {
  _id: number;
  partnerId?: number;
  consId?: number;
  message: string;
  sender: UserProfile;
  hasImages?: boolean;
  images?: [{ id: number; img: string }];
  status?: "sent" | "delivered" | "read" | "unread";
  timeStamp?: string;
}

export interface RecentMessage {
  _id: number;
  message: string;
  sender: UserProfile;
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
