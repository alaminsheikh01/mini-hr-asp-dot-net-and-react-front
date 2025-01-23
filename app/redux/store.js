import { configureStore, createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");
const isMasterUser = localStorage.getItem("isMasterUser") === "true";
const user = JSON.parse(localStorage.getItem("user")) || {};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!token,
    isMasterUser: isMasterUser || false,
    userName: user.userName || "",
    email: user.email || "",
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.isMasterUser = action.payload.isMasterUser;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.isMasterUser = false;
      state.userName = "";
      state.email = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
