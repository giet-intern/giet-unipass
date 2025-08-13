import { Link } from "react-router-dom";
import collegeLogo from "../assets/logo.png";

export default function Navbar() {
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
        <Link to="/login">Admin</Link>
      </div>
    </nav>
  );
}
