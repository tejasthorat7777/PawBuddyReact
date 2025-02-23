import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../../commonFiles/commonTypes";

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
    password: "",
    address: "",
    lastOrder: {
      prodId: "",
      prodName: "",
      prodDiscrip: "",
      prodImg: "",
      prodPrice: "",
      selected: false,
      customerName: "",
      orderId: "",
      orderDate: "",
      prodDiscount: "",
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (
      state: State,
      action: PayloadAction<{ user: State["user"] }>
    ) => {
      state.status = true;
      state.user = action.payload.user;
    },
    logout: (state: State) => {
      return {
        ...state,
        status: false,
        user: initialState.user,
      };
    },
    updateLastOrder: (
      state: State,
      action: PayloadAction<State["user"]["lastOrder"]>
    ) => {
      state.user.lastOrder = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { userInfo, logout, updateLastOrder } = userSlice.actions;
