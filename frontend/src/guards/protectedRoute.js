import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserState } from "../redux/user/userSlice";
import { resetState } from "../redux/transactions/transactionSlice";
import { resetCurrency } from "../redux/currency/currencySlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.session.isAuth);

  if (!isAuth) {
    dispatch(resetUserState());
    dispatch(resetState());
    dispatch(resetCurrency());

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
