import { authReducer } from "../features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { dashboardReducer } from "../features/dashboard/dashboardThunk";

export const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});
