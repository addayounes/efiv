import refReducer from "./slices/ref";
import authReducer from "./slices/auth";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ref: refReducer,
  },
});
