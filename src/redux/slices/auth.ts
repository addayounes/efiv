import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: any;
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: undefined,
  isLoading: true,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.isLoading = !!action.payload.isLoading;
      state.isAuth = !!action.payload.isAuth;
      state.user = action.payload.user;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
