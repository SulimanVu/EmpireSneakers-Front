import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import categoriesSlice from "../features/categoriesSlice";
import applicationSlice from "../features/applicationSlice";
export const store = configureStore({
  reducer: {
    applicationSlice,
    userReducer,
    categoriesSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
