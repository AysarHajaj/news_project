import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { setUserData } from "./authSlice";

const initialState = {
  update: {
    isLoading: false,
    error: null,
  },
};

export const updateProfile = createAsyncThunk(
  "update/profile",
  (data, { rejectWithValue, dispatch }) =>
    api
      .updateProfile(data)
      .then((response) => {
        dispatch(setUserData({ name: data.name, email: data.email }));
        return response.data;
      })
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      // update case
      .addCase(updateProfile.pending, (state) => {
        state.update.isLoading = true;
        state.update.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.update.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.update.isLoading = false;
        state.update.error = action.payload.result.error;
      });
  },
});

export const selectUpdate = (state) => state.profile.update;

export default profileSlice.reducer;
