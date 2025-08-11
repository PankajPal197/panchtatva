import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCity = createAsyncThunk("city/fetch", async () => {
  const res = await axios.get("/api/cities");
  return res.data;
});

export const createCity = createAsyncThunk(
  "city/createCity",
  async (formData, { rejectWithValue }) => {
    try {
     
      const res = await axios.post("/api/cities", formData, {
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

export const updateCity = createAsyncThunk(
  "city/update",
  async ({ updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // ✅ Append the ID first
      formData.append("id", updatedData.id); // 🔴 this is the missing line

      // ✅ Append other fields
      formData.append("city_name", updatedData.city_name || "");
      formData.append("page_url", updatedData.page_url || "");
      formData.append("sort_order", updatedData.sort_order || 1);
      formData.append("status", updatedData.status || "active");
      formData.append("delete_status", updatedData.delete_status || "active");
      formData.append("delete_by", updatedData.delete_by || 1);

      const res = await axios.put(`/api/cities`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (error) {
      console.log("Update Error:", error.response?.data); // 👈 debug this
      return rejectWithValue(
        error.response?.data || { message: "Update failed" }
      );
    }
  }
);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
export const deleteCity = createAsyncThunk(
  "city/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/cities`, {
        id,
        delete_status: "deleted",
        delete_by: 1,
      });
      return response.data.banner;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Soft delete failed" }
      );
    }
  }
);

export const getCityById = createAsyncThunk(
  "city/getCityById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/cities/${id}`);
      return res.data.city;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch failed" }
      );
    }
  }
);

export const updateSortOrder = createAsyncThunk(
  "city/updateSortOrder",
  async ({ id, sort_order }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/cities/${id}`, { sort_order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "city/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/cities/${id}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const citySlice = createSlice({
  name: "city",
  initialState: {
    data: [],
    cityData: null,
    loading: false,
    updateSortOrderStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })

      .addCase(getCityById.fulfilled, (state, action) => {
        state.selectedCity = action.payload;
      })

      .addCase(updateSortOrder.pending, (state) => {
        state.updateSortOrderStatus = "loading";
      })
      .addCase(updateSortOrder.fulfilled, (state, action) => {
        state.updateSortOrderStatus = "succeeded";
      })
      .addCase(updateSortOrder.rejected, (state) => {
        state.updateSortOrderStatus = "failed";
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
      })
      .addCase(updateStatus.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateStatus.rejected, (state) => {
        state.updateStatus = "failed";
      });
  },
});

export default citySlice.reducer;
