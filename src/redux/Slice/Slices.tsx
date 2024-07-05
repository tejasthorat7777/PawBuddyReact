import { createSlice } from "@reduxjs/toolkit";
import { ProductData, UserData } from "../../commonFiles/commonTypes";

interface State {
  status: boolean;
  user: UserData | null;
  itemWishlist: ProductData[] | null | undefined;
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
  itemWishlist: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.status = true;
      state.user = action.payload.user;
    },
    wishlistItem: (state, action) => {
      const newItem = action.payload.item;
      const existingItem = state.itemWishlist?.find(
        (item) => item.productId === newItem.productId
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
