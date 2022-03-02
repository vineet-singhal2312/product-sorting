import { configureStore } from "@reduxjs/toolkit";
import productFilterReducer from "../features/productFilterSlice";

export const store = configureStore({
  reducer: {
    products: productFilterReducer,
  },
});
