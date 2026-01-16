import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteArticle } from "../services/article.service";
import { getAllArticles } from "../services/article.service";
import type { ArticleDTO } from "../utils/types";
import ArticleTable from "../components/admin.article/article.table";
import Spinner from "../components/spinner.loader";


export default function AdminArticles() {
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();


  async function loadSuppliers() {
    setIsLoading(false);
    try {
      setIsLoading(true);
      const data = await getAllArticles();
      
      console.log("getAllUsers response:", data);
      if (Array.isArray(data.articles)) {
        setArticles(data.articles);
        setError(null);

      } else {
        console.error("Données invalides reçues:", data);
        setError("Données invalides reçues du serveur");
        
      }
      setIsLoading(false);
    } catch (err: any) {
      console.error("Erreur lors du chargement des stocks:", err);
      setIsLoading(false);
      if (err.response) {
        setError(`Erreur ${err.response.status}: ${err.response.data?.message || err.message}`);
      } else {
        setError(err.message || "Erreur inconnue");
      }
    }
  }


    async function onDelete(articleId: number) {
      try {
        const res = await deleteArticle(Number(articleId));
        setMessage(res.message)
        setArticles(prev => prev.filter(a => a.id !== articleId));
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la suppression");
      }
    }

  useEffect(() => {
    loadSuppliers();
  }, []);

  return (
    <div style={{padding:"2rem"}}>

      <h1 className="mb-3">Articles</h1>

      <button className = "mb-3 btn btn-outline-dark"  onClick={() => navigate("/admin/articles/create")}>
        Créer un article
      </button>

      

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      {message && <div style={{ color: "green", marginBottom: "1rem" }}>{message}</div>}


      {articles.length === 0 && !isLoading ? (
        <p>La liste d'articles est vide.</p>
      ) :(
          <ArticleTable articles={articles} onDelete ={onDelete}/>
          )}
          {isLoading && <Spinner/>}
    </div>
  );
}
