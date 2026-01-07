import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/auth.service";
import { useAuth } from "../context/authContext";

export default function AdminRoutes() {
  const token = getToken();
  const {user} = useAuth();

  if (!token) return <Navigate to="/" replace />;

  if (user?.role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
