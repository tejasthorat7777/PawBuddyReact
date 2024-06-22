import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../Slice/loginSlice";

const store = configureStore({
    reducer:{
        logid : loginSlice,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store