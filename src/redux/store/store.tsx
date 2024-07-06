import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/Slices";

const store = configureStore({
  reducer: {
    finalState: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
