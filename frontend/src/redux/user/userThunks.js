import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import {
  setIsAuth,
  setError,
  setLoading,
  setUser,
  setToken,
  setBalance,
  resetUserState,
} from "../user/userSlice";
import { resetState } from "../transactions/transactionSlice";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.post("/register", userData);
      if (response.status === 409) {
        dispatch(setError("Email already in use"));
        dispatch(setIsAuth(false));
        dispatch(setLoading(false));
        return rejectWithValue;
      }
      const { token, email, name, id, balance } = response.data.data;
      dispatch(setIsAuth(true));
      dispatch(setError(null));
      dispatch(setUser({ email, name, id }));
      dispatch(setToken(token));
      dispatch(setBalance(balance));
      dispatch(setLoading(false));
      return response.data.data;
    } catch (error) {
      dispatch(setIsAuth(false));
      dispatch(setError("Registration failed"));
      dispatch(setLoading(false));
      console.error("Error registering user:", error);
      return rejectWithValue("Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.post("/login", userData);
      if (response.status === 401) {
        dispatch(setError("Invalid email or password"));
        dispatch(setIsAuth(false));
        dispatch(setLoading(false));
        return rejectWithValue("Invalid email or password");
      }
      const { token, email, name, id, balance } = response.data.data;
      dispatch(setIsAuth(true));
      dispatch(setError(null));
      dispatch(setUser({ email, name, id }));
      dispatch(setToken(token));
      dispatch(setBalance(balance));
      dispatch(setLoading(false));
      return response.data.data;
    } catch (error) {
      dispatch(setIsAuth(false));
      dispatch(setError("Login failed"));
      dispatch(setLoading(false));
      console.error("Error logging in user:", error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { dispatch, getState }) => {
    const { user } = getState().session;
    try {
      await api.post("/logout", {
        id: user.id,
      });
      dispatch(resetUserState());
      dispatch(resetState());
      return true;
    } catch (error) {
      console.error("Error logging out user:", error);
      return false;
    }
  }
);
