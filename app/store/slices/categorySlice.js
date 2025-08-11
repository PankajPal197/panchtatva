import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategory = createAsyncThunk("category/fetch", async () => {
  const res = await axios.get("/api/category");
  return res.data;
});

export const createHomeCategory = createAsyncThunk(
  "category/createHomeCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/category", formData, {
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

export const updateHomeCategory = createAsyncThunk(
  "category/update",
  async ({ updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("id", updatedData.id);
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
      const res = await axios.put(`/api/category`, formData, {
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

export const deleteHomeCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/category`, {
        id,
        delete_status: "deleted",
        delete_by: 1,
      });
      return response.data.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: " Deleted failed" }
      );
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/category/${id}`);
      return res.data.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch failed" }
      );
    }
  }
);

export const updateSortOrder = createAsyncThunk(
  "category/updateSortOrder",
  async ({ id, sort_order }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/category/${id}`, { sort_order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "category/updateStatus",
  async ({ id, status, home_status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/category/${id}`, {
        status,
        home_status,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    loading: false,
    updateSortOrderStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createHomeCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteHomeCategory.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })

      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
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

export default categorySlice.reducer;
