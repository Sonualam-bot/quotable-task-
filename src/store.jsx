import { configureStore } from "@reduxjs/toolkit";
import QuoteReducer from "./features/quotes/QuoteSlice";

export const store = configureStore({
  reducer: {
    quotes: QuoteReducer,
  },
});
