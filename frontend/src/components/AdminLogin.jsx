import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "hodaiml" && password === "Hod@aiml&cs1998") {
      login();
      toast.success("Login successful");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-rose-50 p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-semibold text-rose-600 mb-4 text-center">
          Admin Sign In
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-2 rounded font-semibold hover:bg-rose-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
