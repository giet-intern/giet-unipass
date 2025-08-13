import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin");
  };

  return <AdminDashboard onLogout={handleLogout} />;
}
