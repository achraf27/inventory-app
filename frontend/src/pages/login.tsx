import { useState } from "react";
import { login } from "../services/auth.service";// pour le typage si besoin
import { useNavigate } from "react-router-dom";

export default function Login() {
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
      setMessage(res.message);
      navigate("/dashboard")
    } catch (err) {
      console.error(err.response);
      setError(
         err.response.data.message
      )
    }
  }

  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="username"
          type="text"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          type="password"
        />
        <input type="submit" value="Submit" />
      </form>

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
