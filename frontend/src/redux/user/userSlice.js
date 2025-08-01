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
    resetUserState(state) {
      state.isAuth = false;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.user = null;
      state.balance = 0;
    },
  },
});

export const {
  setIsAuth,
  setUser,
  setLoading,
  setError,
  setToken,
    setBalance,
    resetUserState,
} = sessionSlice.actions;

export default sessionSlice.reducer;
