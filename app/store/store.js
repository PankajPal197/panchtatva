import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import generalConfigReducer from "./slices/genralConfigSlice";
import bannerReducer from "./slices/bannerSlice";
import categoryReducer from "./slices/categorySlice";
import homePageReducer from "./slices/sectionSlice";
import blogReducer from "./slices/blogSlice";
import cityReducer from "./slices/citySlice";
import enquiryReducer from "./slices/enquirySlice";
import productReducer from "./slices/productSlice";
import restoreReducer from "./slices/restoreSlice";
import searchReducer from "./slices/searchSlice";
import imageReducer from "./slices/imageSlice";
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
    enquiry: enquiryReducer,
    product: productReducer,
    restore:restoreReducer,
    search:searchReducer,
    image:imageReducer,
  },
});
