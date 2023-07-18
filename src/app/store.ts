import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import categoriesSlice from "../features/categoriesSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    categoriesSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
