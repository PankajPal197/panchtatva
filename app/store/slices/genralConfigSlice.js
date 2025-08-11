import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchGeneralConfig = createAsyncThunk(
  "generalConfig/fetchGeneralConfig",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/general_config");
      const json = await res.json();
      console.log("🎯 API Response:", json);

      if (json.success && json.data) {
        return json.data;
      } else {
        return thunkAPI.rejectWithValue(json.message || "No data found");
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      return thunkAPI.rejectWithValue("Server error");
    }
  }
);


export const createGeneralConfig = createAsyncThunk(
  "generalConfig/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/general_config", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create config");
    }
  }
);

const generalConfigSlice = createSlice({
  name: "generalConfig",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchGeneralConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGeneralConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGeneralConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createGeneralConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGeneralConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createGeneralConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default generalConfigSlice.reducer;
