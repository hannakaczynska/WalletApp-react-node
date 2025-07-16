import { lazy } from "react";
import { Route, Routes } from 'react-router-dom';
// import React, { useEffect, useState } from "react";
import "./App.css";

const RegistrationPage = lazy(() => import("./pages/registration/RegistrationPage")); 

function App() {

  return (
      <Routes>
        <Route path="/" element={<div>Welcome to Wallet App</div>} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
  );
}

export default App;
