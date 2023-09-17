import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthState } from "../../models";
import { RootState } from "../../app/store";

const initialState: AuthState = {
  isSignedIn: false,
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    signinStatus(state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    },
  },
});

export const { signinStatus } = dashboard.actions;

export const selectSignedIn = (state: RootState) => state.dashboard.isConnected;

export const dashboardReducer = dashboard.reducer;
