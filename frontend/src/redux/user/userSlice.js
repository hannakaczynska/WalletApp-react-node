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
    editBalance(state, action) {
      const { oldamount, newamount, type } = action.payload;
      if (type === "income") {
        state.balance = state.balance - oldamount + newamount;
      } else if (type === "expense") {
        state.balance = state.balance + oldamount - newamount;
      }
    },
    changeBalance(state, action) {
      const { amount, type } = action.payload;
      if (type === "plus") {
        state.balance += amount;
      } else if (type === "minus") {
        state.balance -= amount;
      }
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
  editBalance,
  changeBalance,
  resetUserState,
} = sessionSlice.actions;

export default sessionSlice.reducer;
