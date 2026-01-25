import refReducer from "./slices/ref";
import authReducer from "./slices/auth";
import communicationReducer from "./slices/communication";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    ref: refReducer,
    auth: authReducer,
    communication: communicationReducer,
  },
});
