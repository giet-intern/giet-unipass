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
import { USERNAME } from "./utils/config";

function AppRoutes() {
  const { isAdmin, username } = useAdmin();

  return (
    <Routes>
      {/* Home redirects to dashboard if logged in */}
      <Route
        path="/"
        element={
          isAdmin && username == USERNAME ? (
            <Navigate to="/admin" />
          ) : (
            <LandingPage />
          )
        }
      />

      {/* Admin login only if not logged in */}
      <Route
        path="/login"
        element={
          isAdmin && username == USERNAME ? (
            <Navigate to="/admin" />
          ) : (
            <AdminLogin />
          )
        }
      />

      {/* Admin dashboard protected */}
      <Route
        path="/admin"
        element={
          isAdmin && username == USERNAME ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )
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
