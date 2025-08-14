import axios from "axios";
import { store } from "../redux/store";
import { setIsAuth } from "../redux/user/userSlice";
import { resetUserState, setToken } from "../redux/user/userSlice";
import { resetState } from "../redux/transactions/transactionSlice";
import { resetCurrency } from "../redux/currency/currencySlice";
import { getNavigate } from "../utils/navigation";
import { refreshAccessToken } from "../guards/refreshToken";
import { logoutUser } from "../redux/user/userThunks";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

api.interceptors.request.use((config) => {
  const token = store.getState().session.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const refreshToken = store.getState().session.refreshToken;
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        store.dispatch(setToken(newAccessToken));
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } else {
        await store.dispatch(logoutUser());
        store.dispatch(setIsAuth(false));
        store.dispatch(resetUserState());
        store.dispatch(resetState());
        store.dispatch(resetCurrency());
        const navigate = getNavigate();
        if (navigate) {
          navigate("/login");
        }
      }
      return Promise.reject(error);
    }
  }
);

export default api;
