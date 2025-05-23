import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import userReducer from "../api/authSlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;