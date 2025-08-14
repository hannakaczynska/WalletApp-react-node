import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useSelector(
    (state) => state.session
  );

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#4A56E2" size={100} />
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;