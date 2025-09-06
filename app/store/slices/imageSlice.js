import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchImage = createAsyncThunk("image/fetch", async () => {
  const res = await axios.get("/api/image"); // ← fixed: added "/" before api
  return res.data;
});

export const createImage = createAsyncThunk(
  "image/createImage",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Sending API request to /api/image");

      const res = await axios.post("/api/image", formData, {
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

export const updateImage = createAsyncThunk(
  "image/update",
  async ({ updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      //  Append the ID first
      formData.append("id", updatedData.id); // 🔴 this is the missing line
      //  Append other fields
      formData.append("image_name", updatedData.image_name || "");
      formData.append("product_id", updatedData.product_id || "");
      formData.append("sort_order", updatedData.sort_order || 1);
      formData.append("status", updatedData.status || "active");
      formData.append("delete_status", updatedData.delete_status || "active");
      formData.append("delete_by", updatedData.delete_by || 1);

      //  File (if available)
      if (updatedData.image instanceof File) {
        formData.append("image", updatedData.image);
      }

      const res = await axios.put(`/api/image`, formData, {
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
export const deleteImage = createAsyncThunk(
  "image/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/image`, {
        id,
        delete_status: "deleted",
        delete_by: 1,
      });
      return response.data.image;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Soft delete failed" }
      );
    }
  }
);

export const getImageById = createAsyncThunk(
  "image/getImageById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/image/${id}`);
      return res.data.image;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch failed" }
      );
    }
  }
);

export const updateSortOrder = createAsyncThunk(
  "image/updateSortOrder",
  async ({ id, sort_order }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/image/${id}`, { sort_order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "image/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/image/${id}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState: {
    data: [],
    imageData: null,
    loading: false,
    updateSortOrderStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createImage.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })

      .addCase(getImageById.fulfilled, (state, action) => {
        state.selectedImage = action.payload;
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

export default imageSlice.reducer;
