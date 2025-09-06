// store/slices/HomePageSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlog = createAsyncThunk("blog/fetch", async () => {
  const res = await axios.get("/api/blog");
  return res.data;
});
export const createBlog = createAsyncThunk(
  "blog/createSection",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Sending API request to /api/banner");

      const res = await axios.post("/api/blog", formData, {
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
export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append the ID first
      formData.append("id", updatedData.id);

      formData.append("blog_name", updatedData.blog_name || "");
      formData.append("page_url", updatedData.page_url || 0);
      formData.append("blog_date", updatedData.blog_date || "");
      formData.append("blog_author", updatedData.blog_author || "");
      formData.append("seo_title", updatedData.seo_title || "");
      formData.append("sort_order", updatedData.sort_order || 1);
      formData.append("status", updatedData.status || "active");
      formData.append("seo_description", updatedData.seo_description || "");
      formData.append("seo_keywords", updatedData.seo_keywords || "");
      formData.append("short_description", updatedData.short_description || "");
      formData.append("long_description", updatedData.long_description || "");
      formData.append("delete_status", updatedData.delete_status || "active");
      formData.append("delete_by", updatedData.delete_by || 1);

      // ✅ File (if available)
      if (updatedData.blog_image_1 instanceof File) {
        formData.append("blog_image_1", updatedData.blog_image_1);
      }
      if (updatedData.blog_image_2 instanceof File) {
        formData.append("blog_image_2", updatedData.blog_image_2);
      }

      const res = await axios.put(`/api/blog`, formData, {
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
export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/blog`, {
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
export const getBlogById = createAsyncThunk(
  "blog/getBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      return res.data.blog;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch failed" }
      );
    }
  }
);
export const fetchBlogBySlug = createAsyncThunk(
  "blog/fetchBlogBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data);
      return data.blog || null;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const updateSortOrder = createAsyncThunk(
  "blog/updateSortOrder",
  async ({ id, sort_order }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/blog/${id}`, { sort_order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);
export const updateStatus = createAsyncThunk(
  "blog/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/blog/${id}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: [],
    sectionData: null,
    loading: false,
    updateSortOrderStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchBlog.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
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
      })
      // fetchBlogBySlug
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedBlog = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.selectedBlog = null;
      });
  },
});

export default blogSlice.reducer;
