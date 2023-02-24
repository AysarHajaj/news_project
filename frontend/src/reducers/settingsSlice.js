import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  options: {
    sources: [],
    categories: [],
    isLoading: false,
    error: null,
  },
};

export const getSettingsOptions = createAsyncThunk(
  "get/settings/options",
  (data, { rejectWithValue }) =>
    api
      .getSettingsOptions(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder
      // options case
      .addCase(getSettingsOptions.pending, (state) => {
        state.options.isLoading = true;
        state.options.error = null;
      })
      .addCase(getSettingsOptions.fulfilled, (state, action) => {
        state.options.isLoading = false;
        state.options.sources = action.payload.result.sources;
        state.options.categories = action.payload.result.categories;
      })
      .addCase(getSettingsOptions.rejected, (state, action) => {
        state.options.isLoading = false;
        state.options.error = action.payload.result.error;
      });
  },
});

export const selectOptions = (state) => state.settings.options;

export default settingsSlice.reducer;
