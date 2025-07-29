import axios from "axios";
import { setError } from "../user/userSlice";

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
    console.log("User registered successfully:", response.data);
    //   dispatch(setUser(response.data));
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
