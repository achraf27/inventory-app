import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import type {  UserDTO } from "../utils/types";
import { getAllUsers } from "../services/user.service";
import UserTable from "../components/admin.user/user.table";


export default function AdminUsers() {
  const [users, setUsers] = useState<UserDTO[]>([]);
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

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Sidebar />

      <h1>Utilisateurs</h1>

      <button onClick={() => navigate("/admin/users/create")}>
        Ajouter un utilisateur
      </button>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}


      {users.length === 0 ? (
        <p>La liste d'utilisateurs est vide.</p>
      ) :(
          <UserTable users={users}/>
          )}
    </>
  );
}
