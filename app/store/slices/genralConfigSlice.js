import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGeneralConfig = createAsyncThunk("generalConfig/fetch", async () => {
  const res = await fetch("/api/general_config");
  const data = await res.json();
  return data.data;
});

export const saveGeneralConfig = createAsyncThunk("generalConfig/save", async (formData) => {
  const res = await fetch("/api/general_config", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.data;
});

const slice = createSlice({
  name: "generalConfig",
  initialState: {
    data: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGeneralConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveGeneralConfig.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default slice.reducer;
