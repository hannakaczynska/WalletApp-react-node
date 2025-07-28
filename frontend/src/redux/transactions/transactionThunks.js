import axios from "axios";
import {
  setTransactions,
  setLoading,
  setError,
  setHasMore,
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