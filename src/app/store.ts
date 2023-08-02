import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import categoriesSlice from "../features/categoriesSlice";
import applicationSlice from "../features/applicationSlice";
import globalCategory from "../features/globalCategorySlice";
import productSlice from "../features/productSlice";

export const store = configureStore({
  reducer: {
    applicationSlice,
    userReducer,
    categoriesSlice,
    globalCategory,
    productSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
