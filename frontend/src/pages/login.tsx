import { useState,useEffect } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner.loader";

export default function Login() {

  

  const {setUser} = useAuth()

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] =  useState<string | null>(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword,setShowPassword] = useState<"password"|"text">("password");

  const [isLoading, setIsLoading] = useState<boolean>(false);


  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    console.log("SUBMIT FIRED");
    e.preventDefault();
    setMessage(null);
    setError(null);

     if (!name) {
      setError("Nom vide");
      return;
    }

    if (!password) {
      setError("Mot de passe vide");
      return;
    }

    try {
      setIsLoading(true);
      const res = await login({name,password});
      console.log("Connexion réussie :", res);
      setUser(res.user!)
      setMessage(res.message);
      if(res?.user?.role === "User")
          navigate("/dashboard")
      navigate("/admin/users")
    } catch (err:any) {
      console.error(err.response || err);
      setError(
         err.response?.data?.message
         || "Erreur serveur"
      )
      
    }finally{
      setIsLoading(false);
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

  return (
    <div className="bg-light bg-gradient min-vh-100">
      <div className="container position-absolute top-50 start-50 translate-middle pt-5 pb-5">
      <form className=" mx-auto" style={{maxWidth:"400px"}} onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <div className= "mb-3 ">
          <label className="form-label">Nom d'utilisateur</label>   
          <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
        />
        </div>
      <div className ="mb-3">
          <label className="form-label">Mot de passe</label>   
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword}
          className="form-control"
        />
        </div>
        
        <div className="mb-3">
          
          <input type="checkbox" className="form-check-input me-2"
           onChange={()=>{
                  console.log(showPassword)
                  if(showPassword === "password" ){
                   setShowPassword("text")
                    return;
                  }
                 setShowPassword("password")

        }} />
        
          <label className="form-check-label"
                 >Voir le mot de passe</label>
                 
        </div>


          

          <button
            type="submit"
            className="btn btn-dark me-2"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Valider"}
          </button>
           <Link to ="/">
            <button value="retour" className="btn btn-outline-dark">Retour</button>
          </Link>

         

           {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>

        
      )}

       {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
        
      )}

      
      </form>
      
  </div>
      

    </div>
  );
}
