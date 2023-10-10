import { Language, Message, Mode } from "../../models";
import {
  fetchConversationFailed,
  fetchConversationSuccess,
  fetchFriendRequestsSuccess,
  fetchPartnerProfileSuccess,
  onLanguagesChange,
  onModeChange,
} from "./dashboardSlice";

import { AppThunk } from "../../app/store";
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
    } catch (error: any) {
      console.log("🚀 ~ file: dashboardThunk.ts:36 ~ error:", error);

      dispatch(fetchConversationFailed());

      alert({
        content: `${error.response.data.message}`,
        position: "top-center",
        type: "error",
      });
    }
  };

export const handleGetFriendRequest = (): AppThunk => async (dispatch) => {
  try {
    const res = await conversationService.getFriendRequest();

    const filter = res.data.filter(
      (item) => item.friendShipStatus === "pending"
    );

    dispatch(fetchFriendRequestsSuccess(filter));
  } catch (error) {
    console.log(
      "🚀 ~ file: dashboardThunk.ts:67 ~ handleGetFriendRequest ~ error:",
      error
    );
  }
};

export const handleUpdateRequest =
  (id: string, status: "accepted" | "deny"): AppThunk =>
  async () => {
    try {
      const res = await conversationService.updateFriendRequestStt(id, status);

      if (res) {
        alert({ content: "Accepted", position: "top-center", type: "success" });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: dashboardThunk.ts:81 ~ handleUpdateRequest ~ error:",
        error
      );
      alert({ content: "Accepted", position: "top-center", type: "success" });
    }
  };

export const handleFindContact =
  (email: string): AppThunk =>
  async () => {
    try {
      const res = await conversationService.findContact(email);
      console.log("🚀 ~ file: dashboardThunk.ts:68 ~ res:", res);
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:69 ~ error:", error);
    }
  };

export const handleSendInvitation =
  (id: string): AppThunk =>
  async () => {
    try {
      const res = await conversationService.sendInvitation(id);

      alert({
        content: `${res.message}`,
        position: "top-center",
        type: "success",
      });
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:80 ~ error:", error);
    }
  };

export const handleUpdateSettings =
  (mode: Mode, language: Language): AppThunk =>
  async () => {
    try {
      const res = await conversationService.updateSettings(mode, language);
      console.log("🚀 ~ file: dashboardThunk.ts:132 ~ res:", res);
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:133 ~ error:", error);
    }
  };

export const handleGetSettings = (): AppThunk => async (dispatch) => {
  try {
    const res = await conversationService.getSettings();
    console.log("🚀 ~ file: dashboardThunk.ts:132 ~ res:", res.data);

    if (res && res.data) {
      dispatch(onModeChange(res.data.mode));
      dispatch(onLanguagesChange(res.data.languages));
    }
  } catch (error) {
    console.log("🚀 ~ file: dashboardThunk.ts:133 ~ error:", error);
  }
};

// export const handleGetFriendList = (): AppThunk => async (dispatch) => {};
