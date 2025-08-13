import { useAdmin } from "../context/AdminContext";
import { Link, useNavigate } from "react-router-dom";
import collegeLogo from "../assets/logo.png";

export default function Navbar() {
  const { isAdminLoggedIn, logout } = useAdmin();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow px-6 py-3 flex items-center justify-between z-50">
      <div
        className="flex items-center space-x-3 w-1/4 min-w-[110px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={collegeLogo} alt="Logo" className="h-12 rounded-full" />
        <span className="text-rose-600 text-xl font-semibold whitespace-nowrap select-none">
          Hallticket Download
        </span>
      </div>

      <div className="w-1/4 min-w-[110px] text-right">
        {isAdminLoggedIn ? (
          <button
            onClick={logout}
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2 rounded shadow"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/admin/login"
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2 rounded shadow"
          >
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
}
