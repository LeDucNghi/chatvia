import { AuthState, UserProfile } from "../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,

  reducers: {
    signinStatus(state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    },

    fetchUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
    },
  },
});

export const { signinStatus, fetchUser } = auth.actions;

export const selectSignedIn = (state: RootState) => state.auth.isSignedIn;
export const selectUser = (state: RootState) => state.auth.user;

export const authReducer = auth.reducer;