import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import categoriesSlice from "../features/categoriesSlice";
import globalCategory from "../features/globalCategorySlice";

export const store = configureStore({
  reducer: {
    userReducer,
    categoriesSlice,
    globalCategory,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
