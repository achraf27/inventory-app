import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import type { InventoryArticleDTO } from "../utils/types";
import { getAllInventoryArticles } from "../services/inventory.service";
import InventoryTable from "../components/inventoryTable";

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryArticleDTO[]>([]);
  const [error, setError] = useState<string | null>(null);


  async function loadInventory() {
    try {
      const data = await getAllInventoryArticles();
      console.log("getAllArticles response:", data);

      const articles = data.articles;
      if (Array.isArray(articles)) {
        setInventory(articles);
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
    loadInventory();
  }, []);

  return (
    <>
      <Sidebar />

      <h1>Inventaire</h1>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}


      {inventory.length === 0 ? (
        <p>L’inventaire est vide.</p>
      ) :(
          <InventoryTable articles={inventory}/>
          )}
    </>
  );
}
