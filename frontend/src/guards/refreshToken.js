import axios from "axios";

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) return null;
  try {
    const response = await axios.post("/refresh-token", { refreshToken });
    const { token } = response.data;
    console.log("token", token);
    return token;
  } catch (error) {
    console.log("token expired");
    return null;
  }
};
