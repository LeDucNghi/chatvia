import {
  Conversation,
  DashboardState,
  FriendRequest,
  Language,
  Message,
  Mode,
  Settings,
  UserProfile,
} from "../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const initialState: DashboardState = {
  fetching: {
    isConversation: false,
    isFriendList: false,
    isFriendRequest: false,
    isRecentList: false,
  },

  friends: [],
  friendRequests: [],
  recentList: [],

  conversations: {
    __v: 0,
    _id: "",
    groupName: "",
    isGroup: false,
    messages: [],
    participant: [],
  },

  partner: null,
  settings: null,
  message: null,
  blockedStatus: null,

  mode: "light",
  languages: "en",
  conversationId: "",
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    fetchingConversation(state) {
      state.fetching.isConversation = true;
    },

    fetchingRecentList(state) {
      state.fetching.isRecentList = true;
    },

    fetchingFriendRequest(state) {
      state.fetching.isFriendRequest = true;
    },

    fetchConversationSuccess(state, action: PayloadAction<Conversation>) {
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

    fetchRecentList(state, action: PayloadAction<Conversation[]>) {
      state.fetching.isRecentList = false;
      state.recentList = action.payload;
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

    onBlockedStatusChange(
      state,
      action: PayloadAction<"blocked" | "unBlocked">
    ) {
      state.blockedStatus = action.payload;
    },

    addNewMessage(state, action: PayloadAction<Message>) {
      state.conversations.messages.push(action.payload);
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
  fetchRecentList,
  fetchingRecentList,
  fetchConversationFailed,
  onModeChange,
  onLanguagesChange,
  onBlockedStatusChange,
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
export const selectBlockedStatus = (state: RootState) =>
  state.dashboard.blockedStatus;
export const selectSettings = (state: RootState) => state.dashboard.settings;
export const selectFriendRequest = (state: RootState) =>
  state.dashboard.friendRequests;
export const selectRecentList = (state: RootState) =>
  state.dashboard.recentList;

export const dashboardReducer = dashboard.reducer;
