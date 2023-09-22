import { DashboardState, Message, UserProfile } from "../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const initialState: DashboardState = {
  fetching: {
    isConversation: true,
    isFriendList: false,
  },
  conversations: [],
  friends: [],

  mode: "light",
  languages: "english",
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    fetchConversationSuccess(state, action: PayloadAction<Message[]>) {
      state.conversations = action.payload;
      state.fetching.isConversation = false;
    },

    fetchUserListSuccess(state, action: PayloadAction<UserProfile[]>) {
      state.friends = action.payload;
      state.fetching.isFriendList = false;
    },

    onModeChange(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },

    onLanguagesChange(state, action: PayloadAction<"vietnamese" | "english">) {
      state.languages = action.payload;
    },
  },
});

export const {
  fetchConversationSuccess,
  fetchUserListSuccess,
  onModeChange,
  onLanguagesChange,
} = dashboard.actions;

export const selectConversations = (state: RootState) =>
  state.dashboard.conversations;
export const selectFriendList = (state: RootState) => state.dashboard.friends;
export const selectFetching = (state: RootState) => state.dashboard.fetching;
export const selectMode = (state: RootState) => state.dashboard.mode;
export const selectLanguage = (state: RootState) => state.dashboard.languages;

export const dashboardReducer = dashboard.reducer;
