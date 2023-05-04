import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import TagReducer from "./features/TagSlice";
import CategoryReducer from "./features/CategorySlice";
import UserReducer from "./features/UserSlice";
import productReducer from "./features/ProductSlice";

export const store = configureStore({
  reducer: {
    tag: TagReducer,
    category: CategoryReducer,
    users: UserReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
