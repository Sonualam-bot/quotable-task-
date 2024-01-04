import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.quotable.io";

export const fetchRandomQuotes = createAsyncThunk(
  "/quotes/fetchRandomQuotes",
  async (_, { rejectWithValues }) => {
    try {
      const response = await axios.get(`${BASE_URL}/random`);
      return response.data;
    } catch (error) {
      return rejectWithValues(error);
    }
  }
);

const initialState = {
  quotes: [],
  status: "idle",
  error: "",
};

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandomQuotes.fulfilled, (state, action) => {
        state.status = "success";
        state.quotes = [action.payload];
      })
      .addCase(fetchRandomQuotes.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;
