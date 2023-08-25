import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../utils/UserSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
