import { useNavigate } from "react-router-dom"

export default function Home(){

    const navigate = useNavigate();

    return(<>
    
    <h1>Bienvenue sur vote logiciel de gestion d'inventaire</h1>
    <div>
    <button className="btn btn-primary" onClick={()=>{navigate("/login")}}>Se connecter</button>
    <button className="btn btn-primary" onClick={()=>{navigate("/register")}}>S'inscrire</button>
    </div>
    </>)
}