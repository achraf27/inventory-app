import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Sidebar(){

    const {user,logOut} = useAuth();

    const navigate = useNavigate();

    

    return(
        <>
        <div className="flex">
            <a onClick={()=>{navigate("/dashboard")}}> Dashboard </a>

            {user?.role === "User" && (
        <>
          <a onClick={() => navigate("/inventory")}>Inventaire</a>
          <a onClick={() => navigate("/catalog")}>Catalogue</a>
        </>
      )}

      {user?.role === "Admin" && (
        <>
          <a onClick={() => navigate("/admin/users")}> Utilisateurs</a>
          <a onClick={() => navigate("/admin/suppliers")}> Fournisseurs</a>
          <a onClick={() => navigate("/admin/articles")}> Articles</a>
        </>
      )}
            <a onClick={()=>{navigate("/settings");console.log(user)}}> Paramètres</a>
            <a onClick={()=>{logOut(); navigate("/");}}> Deconnexion</a>
        </div>
        </>
    )
}