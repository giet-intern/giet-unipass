import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";
import { useState } from "react";

export default function AppRoutes() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/admin/login"
          element={
            adminLoggedIn ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin onLogin={() => setAdminLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            adminLoggedIn ? (
              <AdminDashboard onLogout={() => setAdminLoggedIn(false)} />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
