import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userId(state, action:{payload:string}) {
      state.push(action.payload);
      console.log(action.payload);
      console.log("state.push(action.payload)",state[0]);
    },
  },
});

export default userSlice.reducer;
export const { userId } = userSlice.actions;
