import { Link } from "react-router-dom";
import collegeLogo from "../assets/ggu-logo.png";
import { useAdmin } from "../context/AdminContext";

export default function Navbar() {
  const { isAdmin, username, logout } = useAdmin();

  return (
    <nav className="fixed top-0 left-0 w-full bg-rose-600 px-4 py-3 flex items-center justify-between shadow-md z-50">
      <Link to="/" className="flex items-center space-x-2">
        <img src={collegeLogo} alt="Logo" className="h-10 w-10 rounded-full" />
      </Link>

      <h1 className="text-white font-semibold text-lg sm:text-xl text-center flex-1">
        Hallticket Download
      </h1>

      <div className="flex space-x-4 text-white font-medium">
        <Link to="/">Home</Link>
        {!isAdmin ? (
          <Link to="/login">Admin</Link>
        ) : username != "hodaiml" ? (
          <span>Admin</span>
        ) : (
          <button
            onClick={logout}
            className="bg-white text-rose-600 px-3 py-1 rounded font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
