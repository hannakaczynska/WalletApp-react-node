import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isAuth: false,
    token: null,
    loading: false,
    error: null,
    user: null,
    balance: 0,
  },
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
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
    setBalance(state, action) {
      state.balance = action.payload;
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
    setBalance,
  resetState,
} = sessionSlice.actions;

export default sessionSlice.reducer;
