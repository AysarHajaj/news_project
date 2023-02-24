import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/authSlice";
import profileSlice from "../reducers/profileSlice";
import settingsSlice from "../reducers/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    settings: settingsSlice,
  },
});
