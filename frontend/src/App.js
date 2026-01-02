import React from "react";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "./utils/navigation";
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "./guards/refreshToken";
import { setToken, resetUserState, setLoading } from "./redux/user/userSlice";
import "./App.css";
import Header from "./components/Header/Header";
import ClipLoader from "react-spinners/ClipLoader";
import ProtectedRoute from "../src/guards/protectedRoute";

const RegistrationPage = lazy(() =>
  import("./pages/Registration/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const DiagramPage = lazy(() => import("./pages/Diagram/DiagramPage"));
const CurrentPage = lazy(() => import("./pages/Current/CurrentPage"));
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));

function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  React.useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

    useEffect(() => {
    const initAuth = async () => {
      dispatch(setLoading(true));
      try {
        const refreshToken = localStorage.getItem("refreshToken"); 
        if (refreshToken) {
          const newToken = await refreshAccessToken(refreshToken);
          if (newToken) {
            dispatch(setToken(newToken));
          } else {
            dispatch(resetUserState());
          }
        }
      } finally {
        dispatch(setLoading(false));
      }
    };
    initAuth();
  }, [dispatch]);

  const hideHeaderRoutes = ["/login", "/register"];
  const shouldShowHeader = !hideHeaderRoutes.includes(window.location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Suspense
        fallback={
          <div className="spinner-container">
            <ClipLoader color="#4A56E2" size={100} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diagram"
            element={
              <ProtectedRoute>
                <DiagramPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/current"
            element={
              <ProtectedRoute>
                <CurrentPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ProtectedRoute><NotFoundPage /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
