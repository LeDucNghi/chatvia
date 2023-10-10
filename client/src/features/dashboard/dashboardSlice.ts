import {
  DashboardState,
  FriendRequest,
  Language,
  Message,
  MessageRes,
  Mode,
  Settings,
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
  settings: null,
  message: null,

  mode: "light",
  languages: "english",
  conversationId: "",
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

    fetchSettings(state, action: PayloadAction<Settings>) {
      state.settings = action.payload;
    },

    fetchConversationFailed(state) {
      state.fetching.isConversation = false;
    },

    onModeChange(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },

    onLanguagesChange(state, action: PayloadAction<Language>) {
      state.languages = action.payload;
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
  fetchSettings,
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
export const selectSettings = (state: RootState) => state.dashboard.settings;
export const selectFriendRequest = (state: RootState) =>
  state.dashboard.friendRequests;

export const dashboardReducer = dashboard.reducer;
