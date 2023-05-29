import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../slices/sidebarSlice";
import globalReducer from "../slices/globalSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    global: globalReducer,
  },
});
