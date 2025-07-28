import axios from "axios";
import {
  setTransactions,
  setLoading,
  setError,
  setHasMore,
  setTransactionId,
  deleteTransactionReducer
} from "./transactionSlice";

export const fetchTransactions = ({ page = 1, limit = 10 }) => async (dispatch) => {
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

    // Check if there are more transactions to fetch
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
      const response = await axios.delete(`http://localhost:3001/home/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

dispatch(deleteTransactionReducer(id));
      dispatch(setTransactionId(null));
    //   deleteDialogRef.current.close();
      console.log("Delete response ok:", response.data);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return;
    }
}