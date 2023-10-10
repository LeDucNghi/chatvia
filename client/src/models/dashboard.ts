import { UserProfile } from "./auth";

export type Sides =
  | "profile"
  | "chat"
  | "group"
  | "contact"
  | "setting"
  | "request"
  | "notifications";

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

export interface Settings {
  data: {
    _id: string;
    languages: Language;
    mode: Mode;
    user: string;
    __v: number;
  };
}

export interface RequestRes<T> {
  data: T[];
}

export interface DashboardState {
  fetching: {
    isConversation: boolean;
    isFriendList: boolean;
    isFriendRequest: boolean;
  };

  conversations: MessageRes;
  friendRequests: FriendRequest[];
  friends: UserProfile[];
  partner: UserProfile | null;
  mode: Mode;
  languages: Language;
  message: Message | null;
  settings: Settings | null;

  conversationId: string;
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
  _id: string;
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
