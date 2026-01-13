import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  LayoutDashboard,
  Van,
  Users,
  Settings,
  LogOut,
  Store,
  Handbag,
  ShoppingBag,
} from "lucide-react";



export default function Sidebar(){

    const {user,logOut} = useAuth();

    const navigate = useNavigate();

    

    return(
        <>
          <div className="col-auto min-vh-100 bg-dark text-light px-4 pt-4 d-flex flex-column">
            <ul className="navbar-nav">
              <li className="nav-item">

                    
                   <h6>{user?.name}: {user?.role}</h6>

              </li>
             
            

            {user?.role === "User" && (
        <>
         <li className="nav-item">

                <a className = "text-light nav-link" onClick={()=>{navigate("/dashboard")}}>
                   <LayoutDashboard size={20}/>
                    <span className="ms-1 d-none d-sm-inline">Dashboard</span> 
                   </a>

              </li>
        <li className="nav-item">
          <a className = "nav-link" onClick={() => navigate("/inventory")}>
            <Handbag size={20}/>
             <span className="ms-1 d-none d-sm-inline">Inventaire</span>
            </a>
        </li>
        <li className="nav-item">
          <a className = "nav-link" onClick={() => navigate("/catalog")}>
            <ShoppingBag size={20}/>
             <span className="ms-1 d-none d-sm-inline">Catalogue</span>
            </a>
        </li>
        </>
      )}

      {user?.role === "Admin" && (
        <>
        <li className="nav-item">
          
          <a className = "nav-link" onClick={() => navigate("/admin/users")}>
             <Users size={20}/>
              <span className="ms-1 d-none d-sm-inline">Utilisateurs</span>
             </a>
        </li>
        <li className="nav-item">
          <a className = "nav-link"  onClick={() => navigate("/admin/suppliers")}>
             <Van size={20}/>
             <span className="ms-1 d-none d-sm-inline">Fournisseurs</span>
             </a>
        </li>

        <li className="nav-item">
          <a className = "nav-link" onClick={() => navigate("/admin/articles")}>
             <Store size={20}/>
              <span className="ms-1 d-none d-sm-inline">Articles</span>
             </a>
        </li>

        </>
      )}
      </ul>
            <ul className="navbar-nav mt-auto pb-5">
              <li className="nav-item"> 
                <a className =  "nav-link" onClick={()=>{navigate("/settings");console.log(user)}}>
                   <Settings size={20}/>
                    <span className="ms-1 d-none d-sm-inline">Paramètres</span>
                   </a>
              </li>

              <li className="nav-item">
                 <a className = "d-flex nav-link" onClick={()=>{logOut(); navigate("/");}}>
                   <LogOut size={20}/>
                    <span className="ms-1 d-none d-sm-inline">Deconnexion</span>
                   </a>
              </li>
              </ul>
          </div>
        </>
    )
}