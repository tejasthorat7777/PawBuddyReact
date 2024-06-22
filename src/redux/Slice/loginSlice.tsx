import { createSlice,current } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userId: "",
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userId = action.payload.user.userId;
      console.log("current>>>",current(state))
    },
  },
});

export default loginSlice.reducer;
export const { login } = loginSlice.actions;
