import { useState } from "react";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { createArticle, getArticle, updateArticle } from "../services/article.service";
import Spinner from "../components/spinner.loader";

export default function AdminArticleForm(){
    const {article_id} = useParams<{article_id:string}>();

    const isEditMode = !!article_id;

    const [name,setName] = useState<string>("");
    const [unit,setUnit] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    async function handleSubmit(){
        try{
            setIsLoading(true);
            console.log({ name, unit});

            if (!name || !unit) {
                setIsLoading(false);
                setError("Tous les champs obligatoires doivent être remplis");
                return;
                } 

            if(isEditMode && article_id){
               const res = await updateArticle(Number(article_id),{name,unit})
               setMessage(res.message);
            
            }else{
                const res = await createArticle({name,unit});
                setMessage(res.message);
            }
            setIsLoading(false);
        }
        catch(err:any){
            setIsLoading(false);
            console.log(err);
            console.log(name + unit);
             console.error("Erreur lors de la soumission du formulaire:", err);
            if (err.response) {
                setError(`Erreur ${err.response.data?.message}`);
            } else {
                setError(err.message || "Erreur inconnue");
            }
        }
    }

    useEffect(()=>{
        if(!message && !error)
            return;

        const timer = setTimeout(()=>{
            setMessage(null);
            setError(null);
        },3000)

        return () => clearTimeout(timer);
    },[message,error])

    useEffect(()=>{
        setIsLoading(true);
        if(!article_id) return;

        async function loadArticle(){
            try{
                const articleDto = await getArticle(Number(article_id))
                setName(articleDto.article.name);
                setUnit(articleDto.article.unit);
                setIsLoading(false);
            }catch(err:any){
                setIsLoading(false);
                setError("Impossible de charger l'article en mode edition.")
            }
        }
        loadArticle();
    },[article_id]);

    return(<>
    <h1>{isEditMode? "Modifier l'article":"Ajouter un article"}</h1>

     {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
     {message && <div style={{ color: "green", marginBottom: "1rem" }}>{message}</div>}

    <form className=" d-flex flex-column mx-auto gap-2" style={{maxWidth:"400px"}}
     onSubmit={async (e)=> {e.preventDefault() 
                           await handleSubmit()
                            }}>
        <label className="form-label">Nom de l'article</label>   
        <input
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
          type="text"
        />
         <label className="form-label">Unité de l'article</label>   
         <select className ="form-select" id="choix" name="choix" value={unit} aria-placeholder="Rôle"
        onChange={(e)=>setUnit(e.target.value)}>
            <option value="" disabled>
            -- Sélectionnez une unité --
            </option>
            <option value="litres">litres</option>
            <option value="ml">ml</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="unité">unité</option>
            </select>
      
        
        
        <button disabled={isLoading} className="btn btn-dark mt-2"type="submit"> 
            {isLoading ? (
            <Spinner />
        ) : isEditMode ? (
            "Mettre à jour"
        ) : (
            "Créer"
        )} </button>
      </form>

    </>)
}