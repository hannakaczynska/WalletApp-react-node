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
    addTransactionReducer(state, action) {
      const newTransaction = action.payload;
      state.transactions.push(newTransaction);
      state.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    editTransactionReducer(state, action) {
      const updatedTransaction = action.payload;
      state.transactions = state.transactions.map((transaction) =>
        transaction._id === updatedTransaction._id
          ? updatedTransaction
          : transaction
      );
      state.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    deleteTransactionReducer(state, action) {
      const transactionId = action.payload;
      state.transactions = state.transactions.filter(
        (transaction) => transaction._id !== transactionId
      );
    },
        resetState(state) {
      state.transactions = [];
      state.loading = false;
      state.error = null;
      state.currentPage = 1;
      state.hasMore = true;
      state.transactionId = null;
    },
  },
});

export const {
  setTransactions,
  setLoading,
  setError,
  setCurrentPage,
  setHasMore,
  setTransactionId,
  addTransactionReducer,
  editTransactionReducer,
  deleteTransactionReducer,
  resetState,
} = transactionSlice.actions;

export default transactionSlice.reducer;
