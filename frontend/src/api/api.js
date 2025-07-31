import axios from "axios";
import { store } from "../redux/store"; 
import { setIsAuth } from "../redux/user/userSlice";
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
      console.log("Unauthorized access - redirecting to login");

      store.dispatch(setIsAuth(false));

      const navigate = getNavigate();
      if (navigate) {
        navigate("/login");
    }
    return Promise.reject(error);
  }
  }
);

export default api;