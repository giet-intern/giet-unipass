import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-5xl font-bold text-rose-600 mb-4">404</h1>
      <p className="text-xl text-rose-700 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-rose-600 text-white px-6 py-2 rounded font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
}
