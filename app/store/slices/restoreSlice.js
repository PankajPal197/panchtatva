import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDeletedData = createAsyncThunk(
  "restore/fetchDeletedData",
  async (type) => {
    // const res = await axios.get(`/api/${type}`);
    const res = await axios.get(`/api/${type}?delete_status=deleted`);
    return res.data.data;
  }
);


export const restoreItem = createAsyncThunk(
  "restore/restoreItem",
  async ({ type, id }) => {
    await axios.put(`/api/${type}/restore/${id}`);
    // return id;
     return { type, id };
  }
);

export const deleteItem = createAsyncThunk(
  "restore/deleteItem",
  async ({ type, id }) => {
    await axios.delete(`/api/${type}/permanent-delete/${id}`);
    return id;
  }
);

const restoreSlice = createSlice({
  name: "restore",
  initialState: { data: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeletedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeletedData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(restoreItem.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default restoreSlice.reducer;
