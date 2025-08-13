import React, { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <AdminLogin onLogin={handleLoginSuccess} onCancel={() => navigate("/")} />
    </div>
  );
}
