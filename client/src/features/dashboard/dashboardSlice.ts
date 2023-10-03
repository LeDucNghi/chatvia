import {
  DashboardState,
  FriendRequest,
  Message,
  MessageRes,
  UserProfile,
} from "../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const initialState: DashboardState = {
  fetching: {
    isConversation: true,
    isFriendList: false,
    isFriendRequest: false,
  },

  friends: [],
  friendRequests: [],

  conversations: {
    data: {
      __v: 0,
      _id: "",
      groupName: "",
      isGroup: false,
      messages: [],
      participant: [],
    },
  },
  partner: null,

  mode: "light",
  languages: "english",
  conversationId: "",
  message: null,
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    fetchingConversation(state) {
      state.fetching.isConversation = true;
    },

    fetchingFriendRequest(state) {
      state.fetching.isFriendRequest = true;
    },

    fetchConversationSuccess(state, action: PayloadAction<MessageRes>) {
      state.conversations = action.payload;
      state.fetching.isConversation = false;
    },

    fetchUserListSuccess(state, action: PayloadAction<UserProfile[]>) {
      state.friends = action.payload;
      state.fetching.isFriendList = false;
    },

    fetchFriendRequestsSuccess(state, action: PayloadAction<FriendRequest[]>) {
      state.friendRequests = action.payload;
      state.fetching.isFriendList = false;
    },

    fetchPartnerProfileSuccess(state, action: PayloadAction<UserProfile>) {
      state.partner = action.payload;
    },

    onModeChange(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },

    onLanguagesChange(state, action: PayloadAction<"vietnamese" | "english">) {
      state.languages = action.payload;
    },

    fetchConversationFailed(state) {
      state.fetching.isConversation = false;
    },

    addNewMessage(state, action: PayloadAction<Message>) {
      state.conversations.data.messages.push(action.payload);
    },

    addNewRequest(state, action: PayloadAction<FriendRequest>) {
      state.friendRequests.push(action.payload);
    },
  },
});

export const {
  fetchingConversation,
  fetchingFriendRequest,
  fetchFriendRequestsSuccess,
  fetchConversationSuccess,
  fetchUserListSuccess,
  fetchPartnerProfileSuccess,
  fetchConversationFailed,
  onModeChange,
  onLanguagesChange,
  addNewMessage,
  addNewRequest,
} = dashboard.actions;

export const selectConversations = (state: RootState) =>
  state.dashboard.conversations;
export const selectFriendList = (state: RootState) => state.dashboard.friends;
export const selectFetching = (state: RootState) => state.dashboard.fetching;
export const selectMode = (state: RootState) => state.dashboard.mode;
export const selectLanguage = (state: RootState) => state.dashboard.languages;
export const selectPartner = (state: RootState) => state.dashboard.partner;
export const selectFriendRequest = (state: RootState) =>
  state.dashboard.friendRequests;

export const dashboardReducer = dashboard.reducer;
