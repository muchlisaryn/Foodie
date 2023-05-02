import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import TagReducer from "./features/TagSlice";

export const store = configureStore({
  reducer: {
    tag: TagReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
