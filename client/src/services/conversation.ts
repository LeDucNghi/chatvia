import { Message } from "./../models/dashboard";
import { axiosClient } from ".";

export const conversationService = {
  sendMsg(params: Message): Promise<Message> {
    return axiosClient.post("/conversation/sendMessage", params);
  },

  getConversation(id: string, isGroup: boolean): Promise<Message[]> {
    return axiosClient.get(
      `/conversation/getConversation/${id}?isGroup=${isGroup}`
    );
  },
};
