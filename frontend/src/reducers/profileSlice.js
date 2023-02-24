import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  update: {
    isLoading: false,
    error: null,
  },
};

export const updateProfile = createAsyncThunk(
  "update/profile",
  (data, { rejectWithValue }) =>
    api
      .updateProfile(data)
      .then((response) => ({ result: response.data.result, data }))
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
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.update.isLoading = false;
        state.login.user.name = action.payload.data.name;
        state.login.user.email = action.payload.data.email;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.update.isLoading = false;
        state.update.error = action.payload.result.error;
      });
  },
});

export const selectUpdate = (state) => state.profile.update;

export default profileSlice.reducer;
