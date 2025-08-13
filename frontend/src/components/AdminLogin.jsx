import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function AdminLogin() {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full p-8 shadow rounded space-y-6 border border-rose-300"
      >
        <h2 className="text-2xl font-semibold text-rose-600 text-center">
          Admin Login
        </h2>
        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded focus:outline-rose-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded focus:outline-rose-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded shadow"
        >
          Login
        </button>
      </form>
    </div>
  );
}
