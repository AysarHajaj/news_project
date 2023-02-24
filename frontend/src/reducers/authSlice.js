import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import storage from "../storage";

const initialState = {
  login: {
    user: storage.getUser(),
    token: storage.getToken(),
    isLoading: false,
    error: null,
  },
  register: {
    isLoading: false,
    error: null,
  },
};

export const login = createAsyncThunk("login", (data, { rejectWithValue }) =>
  api
    .login(data)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error?.response?.data))
);

export const register = createAsyncThunk(
  "register",
  (data, { rejectWithValue }) =>
    api
      .register(data)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error?.response?.data))
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.login.data = { token: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // login case
      .addCase(login.pending, (state) => {
        state.login.isLoading = true;
        state.login.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.user = action.payload.result.user;
        state.login.token = action.payload.result.token;
        storage.setUser(action.payload.result.user);
        storage.setToken(action.payload.result.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.error = action.payload.result.error;
      })
      // register case
      .addCase(register.pending, (state) => {
        state.register.isLoading = true;
        state.register.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register.isLoading = false;
        state.register.user = action.payload.result.user;
        state.login.token = action.payload.result.token;
        storage.setUser(action.payload.result.user);
        storage.setToken(action.payload.result.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.register.isLoading = false;
        state.register.error = action.payload.result.error;
      });
  },
});

export const selectLogin = (state) => state.auth.login;
export const selectRegister = (state) => state.auth.register;

export default authSlice.reducer;
