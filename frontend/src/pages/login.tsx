import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Login() {
  const {setUser} = useAuth()

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] =  useState<string | null>(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    console.log("SUBMIT FIRED");
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const res = await login({name,password});
      console.log("Connexion réussie :", res);
      setUser(res.user!)
      setMessage(res.message);
      navigate("/dashboard")
    } catch (err:any) {
      console.error(err.response);
      setError(
         err.response.data.message
      )
    }
  }

  return (
    <>
      <div className="container bg-light position-absolute top-50 start-50 translate-middle pt-5 pb-5">
      <form className=" mx-auto" style={{maxWidth:"400px"}} onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <div className= "mb-3 ">
          <label className="form-label">Nom d'utilisateur</label>   
          <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
        /></div>
      <div className ="mb-3">
          <label className="form-label">Mot de passe</label>   
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control"
        />
        </div>
        <div className="mb-3">
          <input type="checkbox" className="form-check-input me-2" />
          <label className="form-check-label">Voir le mot de passe</label>
        </div>
          <input type="submit" value="Valider" className="btn btn-dark me-2 "/>
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
      

    </>
  );
}
