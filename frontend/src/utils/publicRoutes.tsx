import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/auth.service"; 

export default function PublicRoutes(){
    const token = getToken();

    
  if (token) return <Navigate to="/dashboard" replace />;

  return <Outlet />;

}