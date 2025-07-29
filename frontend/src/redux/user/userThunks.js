import axios from "axios";
// import {
// setUser
// } from "./transactionSlice";

export const registerUser =
  (userData) =>
  async (dispatch) => {

    try {
      const response = await axios.post("http://localhost:3001/register", userData);
      console.log("User registered successfully:", response.data);
    //   dispatch(setUser(response.data));
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
