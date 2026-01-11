import { useAuth } from "../context/authContext";
import { useState } from "react";
import { updateMail, updateName, updatePassword } from "../services/user.service";

export default function Settings(){
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    


    const {user,setUser} = useAuth();

    const [username,setUsername] = useState<string>(user?.name ?? "")
    const [mail,setMail] = useState<string>(user?.mail ?? "")
    const [password,setPassword] = useState<string>("");


     async function handleNameUpdate(){
        try{
            const res = await updateName(mail);
            setUser(prev => ({ ...prev!, name: username }));
            setMessage(res.message)
        }catch(err:any){
            setError(err)
        }
    }

    async function handleMailUpdate(){
        try{
            const res = await updateMail(mail);
            setUser(prev => ({ ...prev!, mail }));
            setMessage(res.message)
        }catch(err:any){
            setError(err);
        }
    }

    async function handlePasswordUpdate(){
        try{
            const res = await updatePassword(password);
            setMessage(res.message)
        }catch(err:any){
            setError(err);
        }
    }
   
    
    return(<>
    <h1>Paramètres utilisateur</h1>

     {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
     {message && <div style={{ color: "green", marginBottom: "1rem" }}>{message}</div>}


<form className="" style={{maxWidth:"400px"}}>
    <div>
     <label className="form-label"> Nom de l'utilisateur</label>
    <input
    className="form-control"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
          type="text"
        />
    <button className = "mt-3 mb-3 btn btn-dark"
            onClick={()=>{handleNameUpdate()}}>Modifier son nom</button>
</div>
<div>
 <label className="form-label"> Mail de l'utilisateur</label>
     <input
     className="form-control"
        onChange={(e) => setMail(e.target.value)}
        value={mail}
          type="text"
        />
    <button className = "mt-3 mb-3 btn btn-dark"
            onClick={()=>{handleMailUpdate()}}>Modifier son email</button> 
</div>
<div>
 <label className="form-label"> Mot de passe de l'utilisateur</label>
     <input
     className="form-control"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
          type="password"
        />

     <button className = "mt-3 btn btn-dark"
             onClick={handlePasswordUpdate}>Modifier son mot de passe</button>
    </div>
     </form>
    </>)
}