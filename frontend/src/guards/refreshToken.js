import axios from "axios";

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) return null;
  try {
    const response = await axios.post("/refresh-token", { refreshToken });
    const { token } = response.data;
    return token;
  } catch (error) {
    return null;
  }
};
