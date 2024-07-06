import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData, State } from "../../commonFiles/commonTypes";

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
  itemWishlist: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action: PayloadAction<{ user: State["user"] }>) => {
      state.status = true;
      state.user = action.payload.user;
    },
    wishlistItem: (state, action: PayloadAction<{ item: ProductData }>) => {
      const newItem = action.payload.item;
      const existingItem = state.itemWishlist?.find(
        (item) => item.productId === newItem?.productId
      );

      if (!existingItem) {
        state.itemWishlist?.push(newItem);
      } else {
        state.itemWishlist = state.itemWishlist?.filter(
          (item) => item.productId !== newItem.productId
        );
      }
    },
  },
});

export default userSlice.reducer;
export const { userInfo, wishlistItem } = userSlice.actions;
