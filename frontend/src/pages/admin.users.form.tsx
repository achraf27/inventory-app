import { useState } from "react";
import { adminUpdateMail, adminUpdateName, adminUpdateRole, createUser, getOneUser } from "../services/user.service";
import { useParams } from "react-router-dom"
import { useEffect } from "react";

export default function AdminUserForm(){
    const {user_id} = useParams<{user_id:string}>();

    const isEditMode = !!user_id;

    const [role,setRole] = useState<string>("");
    const [username,setUsername] = useState<string>("");
    const [mail,setMail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(){
        try{
            console.log({ role, username, mail, password });

            if (!role || !username || !mail || (!isEditMode && !password)) {
                setError("Tous les champs obligatoires doivent être remplis");
                return;
                } 

            if(isEditMode && user_id){
               await Promise.all([
                adminUpdateRole(Number(user_id), role),
                adminUpdateName(Number(user_id), username),
                adminUpdateMail(Number(user_id), mail)
            ]);
            }else{
                await createUser({role,name:username,password,mail});
            }
        }
        catch(err:any){
            console.log(err);
            console.log(role + username + mail + password);
             console.error("Erreur lors de la soumission du formulaire:", err);
            if (err.response) {
                setError(`Erreur ${err.response.data?.message}`);
            } else {
                setError(err.message || "Erreur inconnue");
            }
        }
    }

    useEffect(()=>{
        if(!user_id) return;

        async function loadUser(){
            try{
                const res = await getOneUser(Number(user_id))
                setRole(res.user.role);
                setUsername(res.user.name);
                setMail(res.user.mail);
            }catch(err:any){
                setError("Impossible de charger l'utilisateur en mode edition.")
            }
        }
        loadUser();
    },[user_id]);

    return(<>
    <h1>{isEditMode? "Modifier l'utilisateur":"Ajouter un utilisateur"}</h1>

     {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

    <form className=" mx-auto" style={{maxWidth:"400px"}} 
    onSubmit={async (e)=> {e.preventDefault() 
                           await handleSubmit()
                            }}>
        <select id="choix" name="choix" value={role} aria-placeholder="Rôle"
        onChange={(e)=>setRole(e.target.value)}>
            <option value="" disabled>
            -- Sélectionner un rôle --
            </option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            </select>
        <label className="form-label"> Nom de l'utilisateur</label>
        <input
        className="form-control"
        onChange={(e) => setUsername(e.target.value)}
        value={username}

          type="text"
        />
        <label className="form-label"> Mail de l'utilisateur</label>
        <input
        className="form-control"
        onChange={(e) => setMail(e.target.value)}
        value={mail}
          type="email"
        />
       {!isEditMode && (
        <>
        <label className="form-label"> Mot de passe de l'utilisateur</label>
        <input
        className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
        />
        </>
        )}
        
        <input type="submit" value={isEditMode ? "Mettre à jour" : "Créer"} />
      </form>

    </>)
}