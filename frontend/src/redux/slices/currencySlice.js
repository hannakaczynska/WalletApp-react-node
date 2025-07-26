import { createSlice } from '@reduxjs/toolkit';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: { midEuroRate: 0, midGbpRate: 0 },
  reducers: {
    setMidEuroRate: (state, action) => { state.midEuroRate = action.payload },
    setMidGbpRate: (state, action) => { state.midGbpRate = action.payload },
  },
});

export const { setMidEuroRate, setMidGbpRate } = currencySlice.actions;
export default currencySlice.reducer;
