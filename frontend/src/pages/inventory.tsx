import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import type { InventoryArticleDTO } from "../utils/types";
import { getAllInventoryArticles, removeArticleFromInventory, updateInventoryArticleQuantity } from "../services/inventory.service";
import InventoryTable from "../components/inventory/inventory.table";

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


  async function handleDelete(articleId: number) {
  try {
    await removeArticleFromInventory(String(articleId));

    setInventory(prev => prev.filter(a => a.article_id !== articleId));
  } catch (err) {
    console.error(err);
    setError("Erreur lors de la suppression");
  }
}

async function handleUpdateQuantity(articleId: number,quantity:string):Promise<void> {
  try {
    await updateInventoryArticleQuantity(String(articleId),{quantity})

   setInventory((prevInventory) =>
      prevInventory.map((article) =>
        article.article_id === articleId
          ? { ...article, quantity: Number(quantity) }
          : article
      )
    );
  } catch (err) {
    console.error(err);
    setError("Erreur lors de la modification");
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
          <InventoryTable articles={inventory} onDelete={handleDelete} onUpdateQuantity={handleUpdateQuantity}/>
          )}
    </>
  );
}
