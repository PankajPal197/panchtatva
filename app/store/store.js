import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import generalConfigReducer from "./slices/genralConfigSlice";
import bannerReducer from "./slices/bannerSlice";
import categoryReducer from "./slices/categorySlice";
import homePageReducer from "./slices/sectionSlice";
import blogReducer from "./slices/blogSlice";
import cityReducer from "./slices/citySlice";
export const store = configureStore({
  reducer: {
    // user: userReducer,
    auth:authReducer,
    generalConfig: generalConfigReducer,
    homeBanner: bannerReducer,
    category:categoryReducer,
    homePage: homePageReducer,
    blog: blogReducer,
    city: cityReducer,
    
  },
});
