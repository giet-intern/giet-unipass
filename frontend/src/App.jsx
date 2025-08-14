import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const { isAdmin } = useAdmin();

  return (
    <Routes>
      {/* Home redirects to dashboard if logged in */}
      <Route
        path="/"
        element={isAdmin ? <Navigate to="/admin" replace /> : <LandingPage />}
      />

      {/* Admin login only if not logged in */}
      <Route
        path="/login"
        element={isAdmin ? <Navigate to="/admin" replace /> : <AdminLogin />}
      />

      {/* Admin dashboard protected */}
      <Route
        path="/admin"
        element={
          isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <Router>
        <Navbar />
        <div className="pt-1">
          <AppRoutes />
        </div>
      </Router>
    </AdminProvider>
  );
}
