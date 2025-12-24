import { useState } from "react";
import { register } from "../services/auth.service";// pour le typage si besoin
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    console.log("SUBMIT FIRED");
    e.preventDefault();
    try {
      const res = await register({username,mail,password});
      console.log(res);
      alert(res);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }

  return (
    <>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          placeholder="email"
          type="text"
        />
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
       <Link to ="/">
        <button>retourner dans la page principale</button>
        </Link>
    </>
  );
}
