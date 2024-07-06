import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import userReducer, { userInfo, wishlistItem } from "../redux/Slice/Slices";
import { State } from "../commonFiles/commonTypes";

interface WrapperProps {
  children: ReactNode;
  initialState: State | undefined;
}

const Wrapper: React.FC<WrapperProps> = ({ children, initialState }) => {
  const store = configureStore({
    reducer: {
      finalState: userReducer,
    },
  });

  if (initialState?.user) {
    store.dispatch(userInfo({ user: initialState.user }));
  }
  if (initialState?.itemWishlist) {
    initialState.itemWishlist.forEach((item) => {
      store.dispatch(wishlistItem({ item }));
    });
  }

  return (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};

export default Wrapper;
