import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowWidth: 1500,
  progress: 0,
  loading: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setWindowWidth, setProgress, setLoading } = globalSlice.actions;
export default globalSlice.reducer;
