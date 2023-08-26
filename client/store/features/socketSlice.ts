import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { SocketState } from "@/models";

const initialState: SocketState = {
  isConnected: false,
};

export const socket = createSlice({
  name: "socket",
  initialState,

  reducers: {
    onConnect(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { onConnect } = socket.actions;

export const selectConnected = (state: RootState) => state.socket.isConnected;

export const socketReducer = socket.reducer;
