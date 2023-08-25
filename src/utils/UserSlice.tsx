/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialState = {
  users: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// create action
export const getUsers = createAsyncThunk("get_users", async (query) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}&since=1&per_page=5`
    );
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
});

// create Users slice
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  // extra reducers action
  extraReducers: (builder) => {
    // builder users loading...
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    // builder users fullfiled
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = action.payload;
    });
    // builder users rejected
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
