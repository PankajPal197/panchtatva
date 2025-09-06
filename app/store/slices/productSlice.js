import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk("product/fetch", async () => {
  const res = await axios.get("/api/product");
  return res.data;
});

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/product", formData, {
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

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("id", updatedData.id);
      formData.append("product_name", updatedData.product_name || "");
      formData.append("category_id", updatedData.category_id || "");
      formData.append("page_url", updatedData.page_url || "");
      formData.append("extra_heading_1", updatedData.extra_heading_1 || "");
      formData.append("extra_heading_2", updatedData.extra_heading_2 || "");
      formData.append("extra_heading_3", updatedData.extra_heading_3 || "");
      formData.append("extra_heading_3", updatedData.extra_heading_3 || "");
      formData.append("seo_title", updatedData.seo_title || "");
      formData.append("seo_description", updatedData.seo_description || "");
      formData.append("seo_keywords", updatedData.seo_keywords || "");
      // formData.append("color", updatedData.color || "");
      formData.append("color", JSON.stringify([{ name: updatedData.color }]));
      formData.append("price", updatedData.price || 1);
      formData.append("stock", updatedData.stock || "");
      formData.append("discount", updatedData.discount || "");
      formData.append("rating", updatedData.rating || 1);
      formData.append("short_content_1", updatedData.short_content_1 || "");
      formData.append("short_content_2", updatedData.short_content_2 || "");
      formData.append("long_content_1", updatedData.long_content_1 || "");
      formData.append("long_content_2", updatedData.long_content_2 || "");
      formData.append("sort_order", updatedData.sort_order || 1);
      formData.append("status", updatedData.status || "active");
      formData.append("delete_status", updatedData.delete_status || "active");
      formData.append("delete_by", updatedData.delete_by || 1);
      // ✅ File (if available)
      if (updatedData.image_name_1 instanceof File) {
        formData.append("image_name_1", updatedData.image_name_1);
      }
       if (updatedData.image_name_2 instanceof File) {
        formData.append("image_name_2", updatedData.image_name_2);
      }
       if (updatedData.image_name_3 instanceof File) {
        formData.append("image_name_3", updatedData.image_name_3);
      }
       if (updatedData.image_name_4 instanceof File) {
        formData.append("image_name_4", updatedData.image_name_4);
      }
      const res = await axios.put(`/api/product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      // console.log("Update Error:", error.response?.data); 
      return rejectWithValue(
        error.response?.data || { message: "Update failed" }
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/product`, {
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

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/product/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch failed" }
      );
    }
  }
);

export const updateSortOrder = createAsyncThunk(
  "product/updateSortOrder",
  async ({ id, sort_order }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/product/${id}`, { sort_order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "product/updateStatus",
  async ({ id, status, home_status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/product/${id}`, {
        status,
        home_status,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
     categories: [],
    loading: false,
    updateSortOrderStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      })

      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.product || null;
        state.categories = action.payload.categories || [];
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(getProductById.fulfilled, (state, action) => {
      //   state.selectedProduct = action.payload;
      // })

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

export default productSlice.reducer;
