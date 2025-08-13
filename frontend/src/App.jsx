import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider, useAdmin } from "./context/AdminContext";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function Home() {
  const { isAdminLoggedIn } = useAdmin();
  return isAdminLoggedIn ? <AdminDashboard /> : <LandingPage />;
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
