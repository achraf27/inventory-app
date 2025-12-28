import { useState } from "react";
import { register } from "../services/auth.service";
import { Link } from "react-router-dom";

export default function Register() {
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
       setMessage(
     res.message
    );
    } catch (err) {
      console.log(err.response.data)
       setError(
     err.response.data.error
     || err.response.data.message
    );
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

       <Link to ="/">
        <button>retourner dans la page principale</button>
        </Link>
    </>
  );
}
