import { UserProfile } from "./auth";

export type Sides =
  | "profile"
  | "chat"
  | "group"
  | "contact"
  | "setting"
  | "request"
  | "notifications";

export type EditContactType = "block" | "remove";

export type Mode = "dark" | "light";

export type Language = "vi" | "en";

export interface RequestRes<T> {
  data: T[];
}

export interface Conversation {
  _id: string;
  isGroup: boolean;
  messages: Message[];
  participant: UserProfile[];
  groupName: string;
  __v: number;
}

export interface Settings {
  data: {
    _id: string;
    languages: Language;
    mode: Mode;
    user: string;
    __v: number;
  };
}

export interface DashboardState {
  fetching: {
    isConversation: boolean;
    isFriendList: boolean;
    isFriendRequest: boolean;
    isRecentList: boolean;
  };

  blockedStatus: "blocked" | "unBlocked" | null;

  conversations: Conversation;
  friendRequests: FriendRequest[];
  friends: UserProfile[];
  partner: UserProfile | null;
  mode: Mode;
  languages: Language;
  message: Message | null;
  settings: Settings | null;
  recentList: Conversation[];
  group: Conversation[];

  conversationId: string;
}

export interface Message {
  _id?: string;
  partnerId?: number | string;
  consId?: number | string;
  message: string;
  sender?: UserProfile;
  hasImages?: boolean;
  images?: [{ id: string; img: string }];
  status?:
    | "sent"
    | "delivered"
    | "read"
    | "unread"
    | "online"
    | "leave"
    | "off";
  timeStamp?: string;
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

export interface Emoji {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

export interface FriendRequest {
  _id: string;
  friend: string;
  sender: UserProfile;
  friendShipStatus: "pending" | "accepted" | "deny";
  __v: number;
}
