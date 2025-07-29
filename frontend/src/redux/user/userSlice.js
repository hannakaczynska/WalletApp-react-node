import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    token: null,
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    resetState(state) {
      state.token = null;
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  setToken,
  resetState,
} = sessionSlice.actions;

export default sessionSlice.reducer;
