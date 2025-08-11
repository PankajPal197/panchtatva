import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBanner = createAsyncThunk("homeBanner/fetch", async () => {
  const res = await axios.get("/api/banner"); // ← fixed: added "/" before api
  return res.data;
});

export const createHomeBanner = createAsyncThunk(
  "banner/createHomeBanner",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Sending API request to /api/banner");

      const res = await axios.post("/api/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", res.data);

      return res.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);

export const updateHomeBanner = createAsyncThunk(
  "homeBanner/update",
  async ({ updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // ✅ Append the ID first
      formData.append("id", updatedData.id); // 🔴 this is the missing line

      // ✅ Append other fields
      formData.append("heading_1", updatedData.heading_1 || "");
      formData.append("heading_2", updatedData.heading_2 || "");
      formData.append("heading_3", updatedData.heading_3 || "");
      formData.append("sort_order", updatedData.sort_order || 1);
      formData.append("status", updatedData.status || "active");
      formData.append("delete_status", updatedData.delete_status || "active");
      formData.append("delete_by", updatedData.delete_by || 1);

      // ✅ File (if available)
      if (updatedData.image_name instanceof File) {
        formData.append("image_name", updatedData.image_name);
      }

      const res = await axios.put(`/api/banner`, formData, {
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
export const deleteHomeBanner = createAsyncThunk(
  "homeBanner/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/banner`, {
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

export const getBannerById = createAsyncThunk(
  "homeBanner/getBannerById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/banner/${id}`);
      return res.data.banner;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch failed" }
      );
    }
  }
);

export const updateSortOrder = createAsyncThunk(
  "homeBanner/updateSortOrder",
  async ({ id, sort_order }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/banner/${id}`, { sort_order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "homeBanner/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/banner/${id}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const bannerSlice = createSlice({
  name: "homeBanner",
  initialState: {
    data: [],
    bannerData: null,
    loading: false,
    updateSortOrderStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createHomeBanner.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateHomeBanner.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteHomeBanner.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })

      .addCase(getBannerById.fulfilled, (state, action) => {
        state.selectedBanner = action.payload;
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

export default bannerSlice.reducer;
