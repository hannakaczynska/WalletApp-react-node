import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { resetUserState } from "../redux/user/userSlice";
import { resetState } from "../redux/transactions/transactionSlice";
import { resetCurrency } from "../redux/currency/currencySlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.session.isAuth);

  useEffect(() => {
    if (!isAuth) {
      dispatch(resetUserState());
      dispatch(resetState());
      dispatch(resetCurrency());
    }
  }, [isAuth, dispatch]);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
