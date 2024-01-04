import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.quotable.io";

export const fetchRandomQuotes = createAsyncThunk(
  "/quotes/fetchRandomQuotes",
  async (selectedTag, { rejectWithValues }) => {
    try {
      let url = `${BASE_URL}`;

      if (selectedTag) {
        url += `/quotes/random?tags=${selectedTag}`;
      } else {
        url += `/random`;
      }

      const response = await axios.get(url);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValues(error);
    }
  }
);

export const fetchTagsList = createAsyncThunk(
  "/quotes/fetchTagsList",
  async (_, { rejectWithValues }) => {
    try {
      const response = await axios.get(`${BASE_URL}/tags`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValues(error);
    }
  }
);

const initialState = {
  quotes: [],
  status: "idle",
  tags: [],
  tagStatus: "idle",
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
        state.quotes = action.payload;
      })
      .addCase(fetchRandomQuotes.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchTagsList.pending, (state) => {
        state.tagStatus = "loading";
      })
      .addCase(fetchTagsList.fulfilled, (state, action) => {
        state.tagStatus = "success";
        state.tags = action.payload;
      })
      .addCase(fetchTagsList.rejected, (state, action) => {
        state.tagStatus = "error";
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;
