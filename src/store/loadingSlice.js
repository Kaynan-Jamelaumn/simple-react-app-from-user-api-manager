import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { count: 0 },
  reducers: {
    incrementLoading: (state) => {
      state.count += 1;
    },
    decrementLoading: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
  },
});

export const { incrementLoading, decrementLoading } = loadingSlice.actions;
export default loadingSlice.reducer;