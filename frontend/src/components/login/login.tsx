
import { useState } from "react";



export default function Login() {

  const [username,setUsername] = useState<string>("");
  const [password,setPassword] = useState<string>("");


    return (
      <>
        <h1>Login page</h1>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          alert(username);
          
        }
          
          } method="post">
                <input onChange={(e)=>{setUsername(e.target.value)}} value = {username} placeholder="username" type="text" />
                <input onChange={(e)=>{setPassword(e.target.value)}} value = {password} placeholder="password" type="password" />
                <input type="submit" value="Submit"/>
        </form>
      </>
    );
  }