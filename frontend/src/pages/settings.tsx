import { useAuth } from "../context/authContext";
import { useState,useEffect } from "react";
import { updateMail, updateName, updatePassword } from "../services/user.service";
import Spinner from "../components/spinner.loader";

export default function Settings(){
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    


    const {user,setUser} = useAuth();

    const [username,setUsername] = useState<string>(user?.name ?? "")
    const [mail,setMail] = useState<string>(user?.mail ?? "")
    const [password,setPassword] = useState<string>("");


     async function handleNameUpdate(){
        try{
            setIsLoading(true);
            const res = await updateName(username);
            setUser(prev => ({ ...prev!, name: username }));
            setMessage(res.message)
        }catch(err:any){
            setIsLoading(false);
            setError(err?.response?.data?.message ?? "Erreur inconnue");

        }
    }

    async function handleMailUpdate(){
        try{
            setIsLoading(true)
            const res = await updateMail(mail);
            setUser(prev => ({ ...prev!, mail }));
            setMessage(res.message)
        }catch(err:any){
            setIsLoading(false);
            setError(err?.response?.data?.message ?? "Erreur inconnue");

        }
    }

    async function handlePasswordUpdate(){
        try{
            setIsLoading(true)
            if(password.length === 0 || password.length<8){ setError("Mot de passe trop court"); setIsLoading(false);}
            const res = await updatePassword(password);
            setMessage(res.message)
        }catch(err:any){
            setIsLoading(false)
            setError(err?.response?.data?.message ?? "Erreur inconnue");

        }
    }
   
    useEffect(()=>{
        if(!message && !error)
            return;

        const timer = setTimeout(()=>{
            setMessage(null);
            setError(null);
        },3000)

        return () => clearTimeout(timer);
    },[message,error])
    
    return(
    <>


    <h1>Paramètres utilisateur</h1>

     {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
     {message && <div style={{ color: "green", marginBottom: "1rem" }}>{message}</div>}


<form className="d-flex flex-column mx-auto gap-2" style={{maxWidth:"400px"}}>


 
        
     <label className="form-label"> Nom de l'utilisateur</label>
            <div className="input-group mb-3">
    <input onChange={(e) => setUsername(e.target.value)}
            value={username} type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
    <div className="input-group-append">
        <button className="btn btn-outline-dark" type="button" disabled={isLoading}
                onClick={()=>{handleNameUpdate()}}>{isLoading ? <Spinner /> : "Modifier"}
                </button>
        </div>
    </div>




    <label className="form-label"> Mail de l'utilisateur</label>

            <div className="input-group mb-3">
    <input  onChange={(e) => setMail(e.target.value)}
            value={mail} type="email" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
    <div className="input-group-append">
        <button className="btn btn-outline-dark" type="button" disabled={isLoading}
                onClick={()=>{handleMailUpdate()}}>{isLoading ? <Spinner /> : "Modifier"}
                </button>
                 
        </div>
        </div>


    <label className="form-label"> Mot de passe de l'utilisateur</label>
        <div className="input-group mb-3">
    <input  onChange={(e) => setPassword(e.target.value)}
            value={password} type="mail" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
    <div className="input-group-append">
        <button className="btn btn-outline-dark" type="button" disabled={isLoading}
                onClick={()=>{handlePasswordUpdate()}}> {isLoading ? <Spinner /> : "Modifier"}
                </button>
        </div>
        </div>
    
    
     </form>
    </>)
}