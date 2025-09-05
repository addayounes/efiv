import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: any;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  isLoading: false,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.isLoading = !!action.payload.isLoading;
      state.isAuth = !!action.payload.isAuth;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
