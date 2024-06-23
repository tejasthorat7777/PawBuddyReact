import { createSlice, current } from "@reduxjs/toolkit";
import { UserData } from "../../commonFiles/commonTypes";

interface State {
  status: boolean;
  user: UserData | null;
}

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
    city: "",
    password: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.status = true;
      state.user = action.payload.user;
      console.log("current>>>", current(state));
    },
  },
});

export default userSlice.reducer;
export const { userInfo } = userSlice.actions;
