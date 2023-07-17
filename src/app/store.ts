import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

export const rootReducer = combineReducers({
  users: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
