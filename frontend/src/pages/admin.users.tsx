import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type {  UserDTO } from "../utils/types";
import { deleteUser, getAllUsers } from "../services/user.service";
import UserTable from "../components/admin.user/user.table";


export default function AdminUsers() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  async function loadUsers() {
    try {
      const data = await getAllUsers();
      console.log("getAllUsers response:", data);
      if (Array.isArray(data.users)) {
        setUsers(data.users);
        setError(null);
      } else {
        console.error("Données invalides reçues:", data);
        setError("Données invalides reçues du serveur");
      }
    } catch (err: any) {
      console.error("Erreur lors du chargement des stocks:", err);
      if (err.response) {
        setError(`Erreur ${err.response.status}: ${err.response.data?.message || err.message}`);
      } else {
        setError(err.message || "Erreur inconnue");
      }
    }
  }


    async function onDelete(userId: number) {
      try {
        const res = await deleteUser(Number(userId));
        setMessage(res.message)
        setUsers(prev => prev.filter(a => a.id !== userId));
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la suppression");
      }
    }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{padding:"2rem"}}>

      <h1 className="mb-3">Utilisateurs</h1>

      <button className = "mb-3 btn btn-outline-dark" onClick={() => navigate("/admin/users/create")}>
        Ajouter un utilisateur
      </button>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      {message && <div style={{ color: "green", marginBottom: "1rem" }}>{message}</div>}


      {users.length === 0 ? (
        <p>La liste d'utilisateurs est vide.</p>
      ) :(
          <UserTable users={users} onDelete ={onDelete}/>
          )}
    </div>
  );
}
