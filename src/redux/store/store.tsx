import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/loginSlice";

const store = configureStore({
    reducer:{
        userData : userSlice,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store