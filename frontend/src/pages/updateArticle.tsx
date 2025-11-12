import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
import { getArticle, updateArticle } from "../services/stockService";
import type { Stocks } from "../utils/types";

export default function UpdateArticle() {
    

    const {id} = useParams<{id:string}>();
    
    const [article,setArticle] = useState<Stocks|null>(null)

    if(!id) return <div>Article introuvable</div>


    useEffect(()=>{
        async function fetchArticle(){
            const numericId = Number(id!)
            const data = await getArticle(numericId)
            setArticle(data.article);

        }
        fetchArticle();
    },[id])

    async function handleUpdate(e: React.FormEvent){
    e.preventDefault();
    if (!article) return;

    try {
        await updateArticle(Number(id),article);
        alert("Article mis à jour avec succès !");
    } catch (err) {
        console.error(err);
        alert("Erreur lors de la mise à jour");
    }
    }

    return (
      <>
      <Sidebar/>


       <h1>Update page</h1>

       <form onSubmit={handleUpdate}>
        <input
          value={article?.name}
          onChange={(e) => setArticle({ ...article!, name: e.target.value })}
          placeholder="name"
          type="text"
        />
        <input
          value={article?.quantity}
          onChange={(e) => setArticle({ ...article!, quantity: Number(e.target.value) })}
          placeholder="quantity"
          type="text"
        />
         <input

          value={article?.unit}
          onChange={(e) => setArticle({ ...article!, unit: e.target.value })}
          placeholder="unit"
          type="text"
        />
        <input type="submit" value="Submit" />
      </form>

     
</>
    );
  }