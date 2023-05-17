import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import TagReducer from "./features/TagSlice";
import CategoryReducer from "./features/CategorySlice";
import UserReducer from "./features/UserSlice";
import productReducer from "./features/ProductSlice";
import authReducer from "./features/AuthSlice";
import cartReducer from "./features/CartSlice";
import DaerahReducer from "./features/DaerahSlice";

export const store = configureStore({
  reducer: {
    tag: TagReducer,
    category: CategoryReducer,
    users: UserReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    daerah: DaerahReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
