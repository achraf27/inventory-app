import { useState } from "react";
import { register } from "../services/auth.service";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Register() {
  const {setUser}=useAuth();

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] =  useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    console.log("SUBMIT FIRED");
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const res = await register({name,mail,password});
      console.log(res);
      setUser(res.user!)
       setMessage(
     res.message
    );
    } catch (err:any) {
      console.log(err.response.data)
       setError(
     err.response.data.error
     || err.response.data.message
    );
    }
  }

  return (
    <>
     <div className="container">
      <form className="mx-auto" style={{width:"400px"}}onSubmit={handleSubmit}>
         <h1>S'inscrire</h1>
         <div className="mb-3">
           <label className="form-label">Email</label>   
        <input
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          type="text"
          className="form-control"
        />
        </div>

        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur</label> 
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"

        />
        </div>

        <div className="mb-3">
          <label className="form-label">Mot de passe</label> 
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control"
        />
        </div>

        <div className="mb-3">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Voir le mot de passe</label>
          </div>

        <div >
          <button type="submit" value="Valider" className="btn btn-primary">Valider</button>
          <Link to ="/">
            <button value="retour" className="btn btn-primary">Retour</button>
          </Link>
        </div>
      </form>
      </div>
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

    </>
  );
}
