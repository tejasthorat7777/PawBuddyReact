import { createSlice,current } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user : null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.status = true;
      state.user = action.payload.user;
      console.log("current>>>",current(state))
    },
  },
});

export default userSlice.reducer;
export const { userInfo } = userSlice.actions;
