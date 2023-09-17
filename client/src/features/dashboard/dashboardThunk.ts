import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { SocketState } from "../../models";

const initialState: SocketState = {
  isConnected: false,
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    onConnect(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { onConnect } = dashboard.actions;

export const selectConnected = (state: RootState) =>
  state.dashboard.isConnected;

export const dashboardReducer = dashboard.reducer;
