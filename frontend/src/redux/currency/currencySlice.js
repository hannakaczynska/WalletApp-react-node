import { createSlice } from '@reduxjs/toolkit';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: { midEuroRate: null, midGbpRate: null, lastFetchTime: null },
  reducers: {
    setMidEuroRate: (state, action) => { state.midEuroRate = action.payload },
    setMidGbpRate: (state, action) => { state.midGbpRate = action.payload },
    setLastFetchTime: (state, action) => { state.lastFetchTime = action.payload },
  },
});

export const { setMidEuroRate, setMidGbpRate, setLastFetchTime } = currencySlice.actions;
export default currencySlice.reducer;
