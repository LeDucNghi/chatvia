import { AppThunk } from "../../app/store";
import { Message } from "../../models";
import { alert } from "../../utils";
import { conversationService } from "../../services/conversation";
import { fetchConversationSuccess } from "./dashboardSlice";

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

export const getConversation =
  (id: string, isGroup: boolean): AppThunk =>
  async (dispatch) => {
    try {
      const res = await conversationService.getConversation(id, isGroup);
      console.log("🚀 ~ file: dashboardThunk.ts:29 ~ res:", res);

      dispatch(fetchConversationSuccess(res));
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:9 ~ sendMsg ~ error:", error);
      alert({
        content: "Something went wrong 🤔",
        position: "top-center",
        type: "error",
      });
    }
  };
