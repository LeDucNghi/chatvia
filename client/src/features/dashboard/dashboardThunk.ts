import { EditContactType, Language, Message, Mode } from "../../models";
import {
  addNewMessage,
  disabledConversation,
  fetchConversationFailed,
  fetchConversationSuccess,
  fetchFriendRequestsSuccess,
  fetchGroupInformationSuccess,
  fetchGroupListSuccess,
  fetchPartnerProfileSuccess,
  fetchRecentList,
  fetchingConversation,
  fetchingRecentList,
  onBlockedStatusChange,
  onLanguagesChange,
  onModeChange,
  onSubmitting,
} from "./dashboardSlice";

import { AppThunk } from "../../app/store";
import { alert } from "../../utils";
import { conversationService } from "../../services/conversation";
import { socket } from "../../constants";

export const sendMsg =
  (values: Message): AppThunk =>
  async (dispatch, getState) => {
    try {
      // await conversationService.sendMsg(values);

      alert({ content: "Sent 🥳", position: "top-center", type: "success" });

      const user = getState().auth.user;

      socket.emit("send-message", {
        room: values.consId,
        message: values.message,
        sender: user,
      });

      socket.emit("notifications", {
        room: values.consId,
        user: user,
        content: `${user?.username} has sent to you a message`,
        type: "newMsg",
      });

      dispatch(
        addNewMessage({
          consId: values.consId,
          message: values.message,
          sender: user!,
        })
      );
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
  (isGroup: boolean, participant: string[], groupName?: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(fetchingConversation());

    if (participant.length < 0) {
      dispatch(fetchConversationFailed());
    } else {
      const user = getState().auth.user;

      try {
        const res = await conversationService.getConversation(
          isGroup,
          participant,
          groupName
        );

        if (res && res.data) {
          res.data.messages.forEach((cons) => {
            const { sender } = cons;

            if (sender?._id !== user?._id) {
              dispatch(fetchPartnerProfileSuccess(sender!));
            }
          });

          dispatch(fetchConversationSuccess(res.data));

          if (res.data.isGroup === true) {
            dispatch(fetchGroupInformationSuccess(res.data.group!));
          }

          const friend = res.data.participant.find(
            (part) => user!._id !== part._id
          );

          dispatch(fetchPartnerProfileSuccess(friend!));
          dispatch(fetchConversationSuccess(res.data));
        }

        dispatch(disabledConversation(false));
      } catch (error: any) {
        console.log("🚀 ~ file: dashboardThunk.ts:36 ~ error:", error);

        dispatch(fetchConversationFailed());

        alert({
          content: `Something went wrong!!`,
          position: "top-center",
          type: "error",
        });
      }
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
  async (dispatch, getState) => {
    if (status === "accepted") {
      dispatch(onSubmitting({ status: true, type: "isAccepting" }));
    } else {
      dispatch(onSubmitting({ status: true, type: "isDenying" }));
    }

    try {
      const res = await conversationService.updateFriendRequestStt(id, status);

      const request = getState().dashboard.friendRequests;

      if (res) {
        alert({
          content: status === "accepted" ? "Accepted" : "Denied",
          position: "top-center",
          type: "success",
        });

        if (status === "accepted") {
          dispatch(onSubmitting({ status: false, type: "isAccepting" }));
        } else {
          dispatch(onSubmitting({ status: false, type: "isDenying" }));
        }

        const updatedRequest = request.filter((item) => item._id !== id);

        dispatch(fetchFriendRequestsSuccess(updatedRequest));
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
      await conversationService.findContact(email);
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

    if (res && res.data) {
      dispatch(onModeChange(res.data.mode));
      dispatch(onLanguagesChange(res.data.languages));
    }
  } catch (error) {
    console.log("🚀 ~ file: dashboardThunk.ts:133 ~ error:", error);
  }
};

export const fetchAllUsersConversation = (): AppThunk => async (dispatch) => {
  dispatch(fetchingRecentList());

  try {
    const res = await conversationService.getAllConversation();

    if (res) {
      // const filterMessage = res.data.filter(
      //   (item) => item.messages.length !== 0
      // );

      dispatch(fetchRecentList(res.data));

      const newGroupList = res.data.filter((data) => data.isGroup === true);

      dispatch(fetchGroupListSuccess(newGroupList));
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: dashboardThunk.ts:163 ~ fetchAllUsersConversation ~ error:",
      error
    );
  }
};

export const handleEditContact =
  (contactId: string, type: EditContactType): AppThunk =>
  async (dispatch) => {
    try {
      console.log("🚀 ~ file: dashboardThunk.ts:247 ~ type:", type);
      const res = await conversationService.editContact(contactId, type);

      if (res) {
        if (res.message === "Blocked") {
          dispatch(onBlockedStatusChange("blocked"));
          alert({
            content: res.message,
            position: "top-center",
            type: "success",
          });
        } else {
          dispatch(onBlockedStatusChange("unBlocked"));
          alert({
            content: res.message,
            position: "top-center",
            type: "success",
          });
        }
        dispatch(onSubmitting({ type: "isBlocking", status: false }));
      }
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:194 ~ error:", error);
      alert({
        content: "Something went wrong!!",
        position: "top-center",
        type: "error",
      });
      dispatch(onSubmitting({ type: "isBlocking", status: false }));
    }
  };

export const handleCreateGroup =
  (participant: string[], groupName?: string): AppThunk =>
  async () => {
    try {
      const res = await conversationService.createGroup(participant, groupName);
      alert({
        content: res.message,
        position: "top-center",
        type: "success",
      });
    } catch (error) {
      console.log("🚀 ~ file: dashboardThunk.ts:228 ~ error:", error);
      alert({
        content: "Something went wrong!!",
        position: "top-center",
        type: "error",
      });
    }
  };

export const leaveGroup =
  (groupId: string): AppThunk =>
  async (dispatch, getState) => {
    const groupList = getState().dashboard.group;
    console.log("🚀 ~ groupList:", groupList);

    // console.log("🚀 ~ groupId:", groupId);
    try {
      // const res = await conversationService.leaveGroup(groupId);

      // alert({
      //   content: res.message,
      //   position: "top-center",
      //   type: "success",
      // });

      const findGroup = groupList.filter((gr) => gr.group?._id !== groupId);
      console.log("🚀 ~ findGroup:", findGroup);

      // dispatch(fetchGroupListSuccess(findGroup));
      // dispatch(fetchGroupInformationSuccess(null));
    } catch (error) {
      console.log(
        "🚀 ~ file: dashboardThunk.ts:292 ~ leaveGroup ~ error:",
        error
      );
      alert({
        content: "Something went wrong!!",
        position: "top-center",
        type: "error",
      });
    }
  };
