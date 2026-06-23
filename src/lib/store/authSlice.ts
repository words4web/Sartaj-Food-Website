import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUser } from "@/types/auth/auth.types";

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAuthUser(state, action: PayloadAction<{ user: IUser; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    updateAuthUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    restoreAuth(state, action: PayloadAction<{ user: IUser; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
  },
});

export const {
  setAuthLoading,
  setAuthUser,
  updateAuthUser,
  clearAuth,
  setAccessToken,
  restoreAuth,
} = authSlice.actions;

export default authSlice.reducer;
