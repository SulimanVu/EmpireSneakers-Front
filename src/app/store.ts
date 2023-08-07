import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import categoriesSlice from "../features/categoriesSlice";
import applicationSlice from "../features/applicationSlice";
import globalCategory from "../features/globalCategorySlice";
import productSlice from "../features/productSlice";
import favoriteSlice from "../features/favoriteSlice";

export const store = configureStore({
  reducer: {
    applicationSlice,
    userSlice,
    categoriesSlice,
    globalCategory,
    productSlice,
    favoriteSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
