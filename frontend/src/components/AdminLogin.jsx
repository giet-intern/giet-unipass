import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin({ setAdminLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      toast.success("Login successful");
      setAdminLoggedIn(true);
      navigate("/dashboard");
    } else toast.error("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 rounded shadow-md bg-rose-50 flex flex-col space-y-4"
      >
        <h2 className="text-center font-flower text-2xl text-rose-600">
          Admin Sign In
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded border border-rose-300 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded border border-rose-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-rose-600 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
