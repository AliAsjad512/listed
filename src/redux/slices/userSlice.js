import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: "" };

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { login, logout } = user.actions;
