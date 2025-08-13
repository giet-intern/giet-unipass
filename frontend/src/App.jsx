import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={adminLoggedIn ? <AdminDashboard /> : <LandingPage />}
        />
        <Route
          path="/login"
          element={<AdminLogin setAdminLoggedIn={setAdminLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={adminLoggedIn ? <AdminDashboard /> : <LandingPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
