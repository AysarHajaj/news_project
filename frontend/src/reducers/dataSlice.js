import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  get: {
    data: [],
    pages: 1,
    isLoading: false,
    error: null,
  },
};

export const getData = createAsyncThunk(
  "get/data",
  (data, { rejectWithValue }) =>
    api
      .getData(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder
      // get data case
      .addCase(getData.pending, (state) => {
        state.get.isLoading = true;
        state.get.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.get.isLoading = false;
        state.get.data = action.payload.result.articles;
        state.get.pages = action.payload.result.pages;
      })
      .addCase(getData.rejected, (state, action) => {
        state.get.isLoading = false;
        state.get.error = action.payload.result.error;
      });
  },
});

export const selectGet = (state) => state.data.get;

export default dataSlice.reducer;
