import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasMore: true,
    transactionId: null,
  },
  reducers: {
    setTransactions(state, action) {
      const newTransactions = action.payload;
      const combinedData = [...state.transactions, ...newTransactions];
      const uniqueData = combinedData.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t._id === item._id)
      );
      state.transactions = uniqueData;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
    setTransactionId(state, action) {
      state.transactionId = action.payload;
    },
    deleteTransactionReducer(state, action ) {
      const transactionId = action.payload;
      state.transactions = state.transactions.filter(
        (transaction) => transaction._id !== transactionId
      );
    }
  },
});

export const {
  setTransactions,
  setLoading,
  setError,
  setCurrentPage,
  setHasMore,
  setTransactionId,
  deleteTransactionReducer
} = transactionSlice.actions;

export default transactionSlice.reducer;
