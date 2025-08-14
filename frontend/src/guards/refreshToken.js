import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) return null;
  try {
    const response = await axios.post(`${API_URL}refresh-token`, { refreshToken });
    const { token } = response.data;
    return token;
  } catch (error) {
    return null;
  }
};
