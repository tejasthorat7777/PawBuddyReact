import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {State } from "../../commonFiles/commonTypes";

const initialState: State = {
  status: false,
  user: {
    name: "",
    age: "",
    breed: "",
    birthdate: "",
    identification: "",
    owner: "",
    username: "",
    userId: "",
    gender: "",
    acc_type: "",
    password: ""
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action: PayloadAction<{ user: State["user"] }>) => {
      state.status = true;
      state.user = action.payload.user;
    },
  },
});

export default userSlice.reducer;
export const { userInfo } = userSlice.actions;
