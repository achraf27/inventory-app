import { useEffect, useState } from "react";
import type { SupplierArticleDTO } from "../utils/types";
import { getAllSuppliersArticles } from "../services/supplier.service";
import CatalogTable from "../components/catalog/catalog.table";
import Spinner from "../components/spinner.loader";

export default function Catalog() {
  const [articles, setArticles] = useState<SupplierArticleDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading,setIsLoading] = useState<boolean>(false);

  async function loadCatalog() {
    setIsLoading(false);
      try {
        setIsLoading(true);
        const data = await getAllSuppliersArticles();
        console.log("getAllArticles response:", data);
  
        const articles = data.articles;
        if (Array.isArray(articles)) {
          setArticles(articles);
          setError(null);
        } else {
          console.error("Données invalides reçues:", data);
          setError("Données invalides reçues du serveur");
        }
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        console.error("Erreur lors du chargement des stocks:", err);
        if (err.response) {
          setError(`Erreur ${err.response.status}: ${err.response.data?.message || err.message}`);
        } else {
          setError(err.message || "Erreur inconnue");
        }
      }
    }


  useEffect(() => {
    loadCatalog();
  }, []);

  return (
    <>

      <h1>Catalogue</h1>

      {error && <p style={{color:"red"}}>{error}</p>}

      {articles.length === 0 && !isLoading ? (
        <p>Le catalogue est vide</p>
      ): (
        <CatalogTable articles={articles}/>
      )}

      {isLoading && (<Spinner/>)}
    </>
  );
}
