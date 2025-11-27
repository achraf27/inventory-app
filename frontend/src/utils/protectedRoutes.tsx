import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/authService"; 

export default function ProtectedRoutes(){
    const token = getToken();

    if(token !== null)  return  <Outlet/>
    
    return <Navigate to="login"/>;

}