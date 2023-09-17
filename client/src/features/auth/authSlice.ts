import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthState } from "../../models";
import { RootState } from "../../app/store";

const initialState: AuthState = {
  isSignedIn: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,

  reducers: {
    signinStatus(state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    },
  },
});

export const { signinStatus } = auth.actions;

export const selectSignedIn = (state: RootState) => state.auth.isSignedIn;

export const authReducer = auth.reducer;
