import api from "../../api/api"; 
import { setIsAuth, setError, setUser, setToken, setBalance, resetUserState
 } from "../user/userSlice";
 import { resetState } from "../transactions/transactionSlice"; 

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post("/register", userData);
    if (response.status === 409) {
      dispatch(setError("Email already in use"));
      dispatch(setIsAuth(false));
      return false;
    }
    const { token, email, name, id, balance } = response.data.data;
    dispatch(setIsAuth(true));
    dispatch(setError(null));
    dispatch(setUser({ email, name, id }));
    dispatch(setToken(token));
    dispatch(setBalance(balance));
    console.log("User registered successfully:", response.data);
    return true;
  } catch (error) {
    dispatch(setIsAuth(false));
    dispatch(setError("Registration failed"));
    console.error("Error registering user:", error);
    return false;
  }
};


export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().session;
  try {
    await api.post("/logout", {
        id: user.id
    });
    dispatch(resetUserState());
    dispatch(resetState());
    return true;
  } catch (error) {
    console.error("Error logging out user:", error);
    return false;
  }
}