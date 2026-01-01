import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "../services/auth.service";

export default function AdminRoutes() {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/" replace />;

  if (role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
