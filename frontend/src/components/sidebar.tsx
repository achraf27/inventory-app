import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Sidebar(){

    const {user,logOut} = useAuth();

    const navigate = useNavigate();

    

    return(
        <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Logiciel d'inventaire</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
           <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className = "nav-link" onClick={()=>{navigate("/dashboard")}}> Dashboard </a>
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
          <a className = "nav-link" onClick={() => navigate("/admin/users")}> Utilisateurs</a>
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
                <a className =  "nav-link" onClick={()=>{navigate("/settings");console.log(user)}}> Paramètres</a>
              </li>

              <li className="nav-item">
                 <a className = "d-flex nav-link" onClick={()=>{logOut(); navigate("/");}}> Deconnexion</a>
              </li>
              </ul>
            
            </div>
        </div>
        </nav>
        </>
    )
}