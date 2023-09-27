import { Message, MessageRes } from "./../models";

import { axiosClient } from ".";

export const conversationService = {
  sendMsg(params: Message): Promise<Message> {
    return axiosClient.post("/conversation/sendMessage", params);
  },

  getConversation(
    isGroup: boolean,
    participant: string[]
  ): Promise<MessageRes> {
    return axiosClient.post(
      `/conversation/getConversation?isGroup=${isGroup}`,
      { participant }
    );
  },
};
