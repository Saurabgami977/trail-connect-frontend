"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; name: string };
  guide?: any;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  guide: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        user: { id: string; name: string };
        guideProfile?: any;
      }>
    ) {
      state.isAuthenticated = true;
      state.user = action.payload?.user;
      state.guide = action.payload?.guideProfile;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateGuideAvailability(state, action: PayloadAction<any>) {
      if (state.guide) {
        state.guide.availability = action.payload;
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
