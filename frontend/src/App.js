import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
import "./App.css";
import Header from "./components/header/header";

const RegistrationPage = lazy(() => import("./pages/registration/RegistrationPage")); 
const LoginPage = lazy(() => import("./pages/login/LoginPage"));
const DashBoardPage = lazy(() => import("./pages/dashboard/DashboardPage"));

function App() {
  const location = useLocation();
  
  // Define routes where header should not be shown
  const hideHeaderRoutes = ['/login', '/registration'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<DashBoardPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
