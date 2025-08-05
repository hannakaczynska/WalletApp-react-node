import axios from "axios";
import { store } from "../redux/store"; 
import { setIsAuth } from "../redux/user/userSlice";
import { resetUserState } from "../redux/user/userSlice";
import { resetState } from "../redux/transactions/transactionSlice";
import { resetCurrency } from "../redux/currency/currencySlice";
import { getNavigate } from "../utils/navigation";


const api = axios.create({
  baseURL: "http://localhost:3001",
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
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {

      store.dispatch(setIsAuth(false));
      store.dispatch(resetUserState());
      store.dispatch(resetState());
      store.dispatch(resetCurrency());

      const navigate = getNavigate();
      if (navigate) {
        navigate("/login");
    }
    return Promise.reject(error);
  }
  }
);

export default api;