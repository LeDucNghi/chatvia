import {
  ArrResponse,
  Conversation,
  FriendRequest,
  Message,
  RequestRes,
  Settings,
} from "./../models";
import { Language, Mode } from "./../models/dashboard";

import { ObjResponse } from "./../models/common";
import { axiosClient } from ".";

export const conversationService = {
  sendMsg(params: Message): Promise<Message> {
    return axiosClient.post("/conversation/sendMessage", params);
  },

  getConversation(
    isGroup: boolean,
    participant: string[]
  ): Promise<ObjResponse<Conversation>> {
    return axiosClient.post(
      `/conversation/getConversation?isGroup=${isGroup}`,
      { participant }
    );
  },

  getAllConversation(): Promise<ArrResponse<Conversation>> {
    return axiosClient.post(`/conversation/conversations`);
  },

  getFriendRequest(): Promise<RequestRes<FriendRequest>> {
    return axiosClient.get(`/conversation/getFriendRequest`);
  },

  findContact(email: string): Promise<string> {
    return axiosClient.post(`/conversation/findContact`, { email });
  },

  sendInvitation(id: string): Promise<any> {
    return axiosClient.post(`/conversation/sendInvitation/${id}`);
  },

  updateFriendRequestStt(
    id: string,
    status: "accepted" | "deny"
  ): Promise<any> {
    return axiosClient.post(`/conversation/friendRequestStt/${id}`, { status });
  },

  updateSettings(mode: Mode, language: Language): Promise<any> {
    return axiosClient.post(`/conversation/settings`, { language, mode });
  },

  getSettings(): Promise<Settings> {
    return axiosClient.get(`/conversation/settings`);
  },
};
