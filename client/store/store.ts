import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./features/reducers";

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
