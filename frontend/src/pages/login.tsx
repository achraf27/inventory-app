import { useState } from "react";
import { login } from "../services/auth.service";// pour le typage si besoin
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    console.log("SUBMIT FIRED");
    e.preventDefault();
    try {
      const res = await login({username,password});
      console.log("Connexion réussie :", res);
      alert("Connexion réussie !");
      navigate("/dashboard")
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion");
    }
  }

  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
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

    </>
  );
}
