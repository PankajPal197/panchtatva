import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEnquiry = createAsyncThunk("enquiry/fetch", async () => {
  const res = await axios.get("/api/enquiry");
  return res.data;
});
export const createEnquiry = createAsyncThunk(
  "enquiry/createEnquiry",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/enquiry", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);
export const deleteEnquiry = createAsyncThunk(
  "enquiry/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/enquiry`, {
        id,
        // delete_status: "deleted",
        // delete_by: 1,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Soft delete failed" }
      );
    }
  }
);
export const getEnquiryById = createAsyncThunk(
  "enquiry/getEnquiryById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/enquiry/${id}`);
      return res.data.enquiry;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch failed" }
      );
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: {
    data: [],
    enquiryData: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })
      .addCase(getEnquiryById.fulfilled, (state, action) => {
        state.selectedEnquiry = action.payload;
      });
  },
});
export default enquirySlice.reducer;
