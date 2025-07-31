import api from "../../api/api"; 
import { setIsAuth, setError, setUser, setToken, setBalance } from "../user/userSlice";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post("/register", userData);
    if (response.status === 409) {
      dispatch(setError("Email already in use"));
      dispatch(setIsAuth(false));
      return;
    }
    const { token, email, name, id, balance } = response.data.data;
    dispatch(setIsAuth(true));
    dispatch(setError(null));
    dispatch(setUser({ email, name, id }));
    dispatch(setToken(token));
    dispatch(setBalance(balance));
  } catch (error) {
    dispatch(setIsAuth(false));
    dispatch(setError("Registration failed"));
    console.error("Error registering user:", error);
  }
};
