import axios from "axios";
import { setError, setUser, setToken, setBalance } from "../user/userSlice";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/register",
      userData
    );
    if (response.status === 409) {
      console.error("Email already in use");
      dispatch(setError("Email already in use"));
      return;
    }
    const { token, email, name, id, balance } = response.data.data;
    console.log("User registered successfully:", response.data.data);
    dispatch(setUser({ email, name, id }));
    dispatch(setToken(token));
    dispatch(setBalance(balance));
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
