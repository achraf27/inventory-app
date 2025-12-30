import { useNavigate } from "react-router-dom";
import { logOut } from "../services/auth.service";

export default function Sidebar(){

    const navigate = useNavigate();

    return(
        <>
        <div className="flex">
            <a onClick={()=>{navigate("/dashboard")}}> Dashboard </a>
            <a onClick={()=>{navigate("/inventory")}}> Inventaire </a>
            <a onClick={()=>{navigate("/catalog")}}> Catalogue </a>
            <a onClick={()=>{logOut(); navigate("/");}}> Deconnexion</a>
        </div>
        </>
    )
}