import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query) => {
    const res = await axios(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data;
  }
);


const searchSlice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    category: [],
    products: [],
    error: null,
  },
 reducers: {
    clearSearch: (state) => {
      state.category = [];
      state.products = [];
      state.error = null;
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.categorySS = action.payload.data.categories;
          state.products = action.payload.data.products;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
