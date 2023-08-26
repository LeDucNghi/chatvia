import { combineReducers } from "@reduxjs/toolkit";
import { socketReducer } from "./socketSlice";

export const rootReducer = combineReducers({
  socket: socketReducer,
});
