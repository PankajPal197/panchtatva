// store/slices/HomePageSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHomePage = createAsyncThunk("homePage/fetch", async () => {
  const res = await axios.get("/api/home-page");
  return res.data;
});
export const createHomePage = createAsyncThunk(
  "homePage/createSection",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Sending API request to /api/banner");

      const res = await axios.post("/api/home-page", formData, {
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
export const updateHomePage = createAsyncThunk(
  "homePage/update",
  async ({ updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // ✅ Append the ID first
      formData.append("id", updatedData.id); // 🔴 this is the missing line

      // ✅ Append other fields
      formData.append("section_name", updatedData.section_name || "");
      formData.append("m_id", updatedData.m_id || 0);
      formData.append("heading_1", updatedData.heading_1 || "");
      formData.append("heading_2", updatedData.heading_2 || "");
      formData.append("heading_3", updatedData.heading_3 || "");
      formData.append("sort_order", updatedData.sort_order || 1);
      formData.append("status", updatedData.status || "active");
      formData.append("short_content_1", updatedData.short_content_1 || "");
      formData.append("short_content_2", updatedData.short_content_2 || "");
      formData.append("long_content_1", updatedData.long_content_1 || "");
      formData.append("long_content_2", updatedData.long_content_2 || "");
      formData.append("delete_status", updatedData.delete_status || "active");
      formData.append("delete_by", updatedData.delete_by || 1);

      // ✅ File (if available)
      if (updatedData.image_1 instanceof File) {
        formData.append("image_1", updatedData.image_1);
      }
      if (updatedData.image_2 instanceof File) {
        formData.append("image_2", updatedData.image_2);
      }

      const res = await axios.put(`/api/home-page`, formData, {
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
export const deleteHomePage = createAsyncThunk(
  "homePage/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/home-page`, {
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
export const getSectionById = createAsyncThunk(
  "homePage/getSectionById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/home-page/${id}`);
      return res.data.banner;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch failed" }
      );
    }
  }
);
export const updateSortOrder = createAsyncThunk(
  "homePage/updateSortOrder",
  async ({ id, sort_order }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/home-page/${id}`, { sort_order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);
export const updateStatus = createAsyncThunk(
  "homePage/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/home-page/${id}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const sectionSlice = createSlice({
  name: "homePage",
  initialState: {
    data: [],
    sectionData: null,
    loading: false,
     updateSortOrderStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchHomePage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createHomePage.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteHomePage.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })
      .addCase(getSectionById.fulfilled, (state, action) => {
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

export default sectionSlice.reducer;
