import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import generalConfigReducer from "./slices/genralConfigSlice";
export const store=configureStore({
    reducer:{
        user:userReducer,
        generalConfig:generalConfigReducer
    },
}); 