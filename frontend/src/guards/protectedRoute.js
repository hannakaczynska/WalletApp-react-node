import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { resetUserState, setToken } from "../redux/user/userSlice";
import { resetState } from "../redux/transactions/transactionSlice";
import { resetCurrency } from "../redux/currency/currencySlice";
import { refreshAccessToken } from "./refreshToken";
import api from "../api/api"; 

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.session.isAuth);
  const refreshToken = useSelector((state) => state.session.refreshToken);

  useEffect(() => {
    const checkToken = async () => {
      const newToken = await refreshAccessToken(refreshToken);
      if (newToken) {
        dispatch(setToken(newToken));
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      } else {
        dispatch(resetUserState());
        dispatch(resetState());
        dispatch(resetCurrency());
      }
    };
    checkToken();
  }, [refreshToken, dispatch]);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
