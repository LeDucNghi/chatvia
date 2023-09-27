import {
  fetchConversationSuccess,
  fetchPartnerProfileSuccess,
} from "./dashboardSlice";

import { AppThunk } from "../../app/store";
import { Message } from "../../models";
import { alert } from "../../utils";
import { conversationService } from "../../services/conversation";

export const sendMsg =
  (values: Message): AppThunk =>
  async () => {
    try {
      await conversationService.sendMsg(values);

      alert({ content: "Sent 🥳", position: "top-center", type: "success" });
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:9 ~ sendMsg ~ error:", error);
      alert({
        content: "Something went wrong 🤔",
        position: "top-center",
        type: "error",
      });
    }
  };

export const fetchConversation =
  (isGroup: boolean, participant: string[]): AppThunk =>
  async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const res = await conversationService.getConversation(
        isGroup,
        participant
      );

      if (res) {
        res.data.messages.forEach((cons) => {
          const { sender } = cons;

          if (sender?._id !== user?._id) {
            dispatch(fetchPartnerProfileSuccess(sender!));
          }
        });

        dispatch(fetchConversationSuccess(res));
      }
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:36 ~ error:", error);

      alert({
        content: "Something went wrong 🤔",
        position: "top-center",
        type: "error",
      });
    }
  };
