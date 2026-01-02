import { useNavigate } from "react-router-dom";
import { getRole, logOut } from "../services/auth.service";

export default function Sidebar(){

    const role = getRole();

    const navigate = useNavigate();

    return(
        <>
        <div className="flex">
            <a onClick={()=>{navigate("/dashboard")}}> Dashboard </a>

            {role === "User" && (
        <>
          <a onClick={() => navigate("/inventory")}>Inventaire</a>
          <a onClick={() => navigate("/catalog")}>Catalogue</a>
        </>
      )}

      {role === "Admin" && (
        <>
          <a onClick={() => navigate("/admin/users")}> Utilisateurs</a>
          <a onClick={() => navigate("/admin/suppliers")}> Fournisseurs</a>
          <a onClick={() => navigate("/admin/articles")}> Articles</a>
        </>
      )}
            <a onClick={()=>{navigate("/settings");}}> Paramètres</a>
            <a onClick={()=>{logOut(); navigate("/");}}> Deconnexion</a>
        </div>
        </>
    )
}