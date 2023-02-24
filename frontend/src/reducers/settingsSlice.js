import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { setSettingData } from "./authSlice";

const initialState = {
  options: {
    sources: [],
    categories: [],
    isLoading: false,
    error: null,
  },

  update: {
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

export const updateSettings = createAsyncThunk(
  "update/settings",
  (data, { rejectWithValue, dispatch }) =>
    api
      .updateSettings(data.id, data)
      .then((response) => {
        dispatch(setSettingData(data));
        return response.data;
      })
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
      })
      // update case
      .addCase(updateSettings.pending, (state) => {
        state.update.isLoading = true;
        state.update.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.update.isLoading = false;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.update.isLoading = false;
        state.update.error = action.payload.result.error;
      });
  },
});

export const selectOptions = (state) => state.settings.options;
export const selectUpdate = (state) => state.settings.update;

export default settingsSlice.reducer;
