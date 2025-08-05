import api from "../../api/api";
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
import { changeBalance, editBalance } from "../user/userSlice";

export const fetchTransactions =
  ({ page = 1, limit = 10, userId }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get("/home", {
        params: {
          limit,
          offset: (page - 1) * limit,
          userId,
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

export const deleteTransaction = (id, userId) => async (dispatch) => {
  try {
    const deletedTransaction = await api.delete(`/home/${id}`, {
      params: { userId },
    });

    if (deletedTransaction.status === 200) {
      const transaction = deletedTransaction.data.data.transaction;
      if (transaction) {
        dispatch(
          changeBalance({
            amount: transaction.amount,
            type: transaction.type === "income" ? "minus" : "plus",
          })
        );
      }
      dispatch(deleteTransactionReducer(id));
      dispatch(setTransactionId(null));
    }
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return;
  }
};

export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const response = await api.post("/home", transaction);

    if (response.status === 201) {
      const newTransaction = response.data.data.transaction;
      if (newTransaction) {
        dispatch(
          changeBalance({
            amount: newTransaction.amount,
            type: newTransaction.type === "income" ? "plus" : "minus",
          })
        );
      }
      dispatch(addTransactionReducer(response.data.data.transaction));
    }
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};

export const editTransaction =
  (id, userId, updatedTransaction) => async (dispatch) => {
    try {
      const response = await api.put(`/home/${id}`, updatedTransaction, {
        params: { userId },
      });
      if (response.status === 200) {
        const newTransaction = response.data.data.updatedTransaction;
        const oldTransaction = response.data.data.oldTransaction;
        if (newTransaction && oldTransaction) {
          dispatch(editBalance({ oldamount: oldTransaction.amount, newamount: newTransaction.amount, type: newTransaction.type }));
        }
        dispatch(editTransactionReducer(response.data.data.updatedTransaction));
        dispatch(setTransactionId(null));
      }
    } catch (error) {
      console.error("Error editing transaction:", error);
      return;
    }
  };
