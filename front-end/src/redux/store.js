import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { BlogsApi } from "./apis/Blog";

export const store = configureStore({
  reducer: {
    [BlogsApi.reducerPath]: BlogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BlogsApi.middleware),
});

setupListeners(store.dispatch);
