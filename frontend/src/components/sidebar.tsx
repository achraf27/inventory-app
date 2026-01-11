import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  Home,
  LayoutDashboard,
  User,
  Users,
  Settings,
  LogOut,
  Bell,
  Mail,
  FileText
} from "lucide-react";


export default function Sidebar(){

    const {user,logOut} = useAuth();

    const navigate = useNavigate();

    

    return(
        <>
      <div className='container-fluid text-light'>
        <div className="row">
          <div className="col-auto min-vh-100 bg-dark">
            <ul className="navbar-nav">
              <li className="nav-item">

                <a className = "text-light nav-link" onClick={()=>{navigate("/dashboard")}}>
                   <Home/>
                   Dashboard 
                   </a>

              </li>
            

            {user?.role === "User" && (
        <>
        <li className="nav-item">
          <a className = "nav-link" onClick={() => navigate("/inventory")}>Inventaire</a>
        </li>
        <li className="nav-item">
          <a className = "nav-link" onClick={() => navigate("/catalog")}>Catalogue</a>
        </li>
        </>
      )}

      {user?.role === "Admin" && (
        <>
        <li className="nav-item">
          
          <a className = "nav-link" onClick={() => navigate("/admin/users")}>
             <Users/>
             Utilisateurs
             </a>
        </li>
        <li className="nav-item">
          <a className = "nav-link"  onClick={() => navigate("/admin/suppliers")}> Fournisseurs</a>
        </li>

        <li className="nav-item">
          <a className = "nav-link" onClick={() => navigate("/admin/articles")}> Articles</a>
        </li>

        </>
      )}
      </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"> 
                <a className =  "nav-link" onClick={()=>{navigate("/settings");console.log(user)}}>
                   <Settings/>
                   Paramètres
                   </a>
              </li>

              <li className="nav-item">
                 <a className = "d-flex nav-link" onClick={()=>{logOut(); navigate("/");}}>
                   <LogOut/>
                   Deconnexion
                   </a>
              </li>
              </ul>
          </div>
        </div>

      </div>

        </>
    )
}