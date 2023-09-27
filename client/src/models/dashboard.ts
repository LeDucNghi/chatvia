import { UserProfile } from "./auth";

export type Sides = "profile" | "chat" | "group" | "contact" | "setting";

export type Mode = "dark" | "light";

export type Language = "vietnamese" | "english";

export interface MessageRes {
  data: {
    _id: string;
    isGroup: boolean;
    messages: Message[];
    participant: string[];
    groupName: string;
    __v: number;
  };
}

export interface DashboardState {
  fetching: {
    isConversation: boolean;
    isFriendList: boolean;
  };

  conversations: MessageRes | null;
  friends: UserProfile[];
  partner: UserProfile | null;

  conversationId: string;

  mode: Mode;
  languages: Language;
}

export interface Message {
  _id?: number;
  partnerId?: number | string;
  consId?: number | string;
  message: string;
  sender?: UserProfile;
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

export interface Options {
  id: number;
  icon?: string;
  name: string;
  img?: string;
}

export interface ContactInvite {
  email: string;
  message: string;
}
