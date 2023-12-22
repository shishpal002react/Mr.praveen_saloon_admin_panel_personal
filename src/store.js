import { configureStore } from "@reduxjs/toolkit";
import loginslice from "./slices/loginslice";

export const store = configureStore({
    reducer:{
        auth: loginslice,
    }
})