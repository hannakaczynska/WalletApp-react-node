import React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "./utils/navigation";
import "./App.css";
import Header from "./components/header/header";
import ProtectedRoute from "../src/guards/protectedRoute";

const RegistrationPage = lazy(() => import("./pages/registration/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/login/LoginPage"));
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const NotFoundPage = lazy(() => import("./pages/not-found/NotFoundPage"));

function App() {
  const hideHeaderRoutes = ["/login", "/registration"];
  const shouldShowHeader = !hideHeaderRoutes.includes(window.location.pathname);

  const navigate = useNavigate();
  React.useEffect(() => {
    setNavigate(navigate); 
  }, [navigate]);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/diagram"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/current"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </Suspense>
    </>
  );
}

export default App;
