import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../utils/UserSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
