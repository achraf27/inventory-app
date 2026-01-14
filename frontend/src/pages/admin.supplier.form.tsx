import { useState } from "react";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { createSupplier, getAllArticlesBySupplier, getOneSupplier, updateSupplier, updateSupplierArticles } from "../services/supplier.service";
import type { ArticleDTO, SupplierArticleDTO } from "../utils/types";
import { getAllArticles } from "../services/article.service";

export default function AdminSupplierForm(){
    const {supplier_id} = useParams<{supplier_id:string}>();

    const isEditMode = !!supplier_id;

    const [contactName,setContactName] = useState<string>("");
    const [mail,setMail] = useState<string>("");
    const [phone,setPhone] = useState<string>("");
    const [address,setAddress] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [_supplierArticles,setSupplierArticles]= useState<SupplierArticleDTO[]>([]);
    const [articles,setArticles]= useState<ArticleDTO[]>([]);

    const [selectedArticleIds, setSelectedArticleIds] = useState<number[]>([]);


    

    async function handleSubmit(){
        try{
            console.log({ contactName, mail, phone, address });

            if (!contactName || !mail || !phone || !address) {
                setError("Tous les champs obligatoires doivent être remplis");
                return;
                } 

            if(isEditMode && supplier_id){
               const res = await updateSupplier(Number(supplier_id),{contact_name:contactName,mail,phone,address})
               await updateSupplierArticles(Number(supplier_id),selectedArticleIds)
               setMessage(res.message);
            
            }else{
                const res = await createSupplier({contact_name:contactName,mail,phone,address});
                setMessage(res.message);
            }
        }
        catch(err:any){
            console.log(err);
            console.log(contactName + mail +phone + address);
             console.error("Erreur lors de la soumission du formulaire:", err);
            if (err.response) {
                setError(`Erreur ${err.response.data?.message}`);
            } else {
                setError(err.message || "Erreur inconnue");
            }
        }
    }

function handleArticleToggle(articleId: number) {
    setSelectedArticleIds((prev) =>
        prev.includes(articleId)
            ? prev.filter(id => id !== articleId)
            : [...prev, articleId]
    );
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
        if(!supplier_id) return;

        async function loadSupplier(){
            try{
                const supplierDto = await getOneSupplier(Number(supplier_id))
                setContactName(supplierDto.supplier.contact_name);
                setMail(supplierDto.supplier.mail);
                setPhone(supplierDto.supplier.phone)
                setAddress(supplierDto.supplier.address)
            }catch(err:any){
                setError("Impossible de charger le fournisseur en mode edition.")
            }
        }
        async function loadArticles(){
            try{
                if(isEditMode){
                    const supplierArticlesDto = await getAllArticlesBySupplier(Number(supplier_id))
                    const articlesDto = await getAllArticles();

                    console.log(articlesDto);

                    setArticles(articlesDto.articles);
                    setSupplierArticles(supplierArticlesDto.articles)
                    setSelectedArticleIds(
                    supplierArticlesDto.articles.map(a => a.article_id)
                    );
            }
            else{
                    const articlesDto = await getAllArticles();

                    console.log(articlesDto);

                    setArticles(articlesDto.articles);

            }
            }catch(err:any){
                setError(" Impossible de charger les articles du fournisseur.")
            }
        }

        
        loadSupplier();
        loadArticles();
    },[]);

    return(<>
    <h1>{isEditMode? "Modifier le fournisseur":"Ajouter un fournisseur"}</h1>

     {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
     {message && <div style={{ color: "green", marginBottom: "1rem" }}>{message}</div>}


        <h3>Informations fournisseur : </h3>
    <form className="d-flex flex-column mx-auto gap-2" style={{maxWidth:"400px"}} onSubmit={async (e)=> {e.preventDefault() 
                           await handleSubmit()
                            }}>
        <label className="form-label" >Nom de contact </label>
        
        <input
        className="form-control"
        onChange={(e) => setContactName(e.target.value)}
        value={contactName}
          type="text"
        />
        <label className="form-label" >Mail </label>
        <input
        className="form-control"
        onChange={(e) => setMail(e.target.value)}
        value={mail}
          type="email"
        />
        <label className="form-label">Numero de telephone </label>
        <input
        className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="tel"
        />

        <label className="form-label">Addresse </label>
         <input
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Addresse"
            type="text"
        />

        <h3>Articles associées : </h3>

        {articles.map((article) => (
            <div className="form-check">
        <label className="form-label" key={article.id}>
            
            <input
            className="form-check-input"
            type="checkbox"
            checked={selectedArticleIds.includes(article.id ?? 0)}
            onChange={() => handleArticleToggle(article.id ?? 0)}
            />
            {article.name}
            
        </label>
        </div>
        
        ))}


        <input className="btn btn-dark mt-2" type="submit" value={isEditMode ? "Mettre à jour" : "Créer"} />
      </form>

    </>)
}