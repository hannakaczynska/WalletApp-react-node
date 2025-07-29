import axios from "axios";
import {
  setTransactions,
  setLoading,
  setError,
  setHasMore,
  setTransactionId,
  addTransactionReducer,
  editTransactionReducer,
  deleteTransactionReducer,
} from "./transactionSlice";

export const fetchTransactions =
  ({ page = 1, limit = 10 }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get("http://localhost:3001/home", {
        params: {
          limit,
          offset: (page - 1) * limit,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newTransactions = response.data.data.transactions;
      dispatch(setTransactions(newTransactions));

      if (newTransactions.length < limit) {
        dispatch(setHasMore(false));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/home/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteTransactionReducer(id));
    dispatch(setTransactionId(null));
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return;
  }
};

export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/home", transaction, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      dispatch(addTransactionReducer(response.data.data.transaction));
    }
  } catch (error) {
    console.error("Error adding transaction:", error);
  } 
};

export const editTransaction = (id, updatedTransaction) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3001/home/${id}`, updatedTransaction, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch(editTransactionReducer(response.data.data.transaction));
      dispatch(setTransactionId(null));
    }
  } catch (error) {
    console.error("Error editing transaction:", error);
    return;
  }
};