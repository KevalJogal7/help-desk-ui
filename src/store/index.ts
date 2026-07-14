import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlice";
import toastReducer from "./slices/toastSlice";
import dropdownReducer from "./slices/dropdownSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    toast: toastReducer,
    dropdown: dropdownReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
