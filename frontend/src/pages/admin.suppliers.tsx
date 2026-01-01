import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import type {  SupplierDTO } from "../utils/types";
import SupplierTable from "../components/admin.supplier/supplier.table";
import { getAllSuppliers } from "../services/supplier.service";

export default function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  async function loadSuppliers() {
    try {
      const data = await getAllSuppliers();
      console.log("getAllUsers response:", data);
      if (Array.isArray(data.suppliers)) {
        setSuppliers(data.suppliers);
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
    loadSuppliers();
  }, []);

  return (
    <>
      <Sidebar />

      <h1>Fournisseurs</h1>

       <button onClick={() => navigate("/admin/suppliers/create")}>
        Ajouter un fournisseur
      </button>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}


      {suppliers.length === 0 ? (
        <p>La liste de fournisseurs est vide.</p>
      ) :(
          <SupplierTable suppliers={suppliers}/>
          )}
    </>
  );
}
