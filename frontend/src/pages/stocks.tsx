import Sidebar from "../components/sidebar";
import { createArticle, deleteArticle } from "../services/article.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { InventoryArticleDTO } from "../utils/types";
import { getAllArticles } from "../services/inventory.service";


export default function Stocks() {

  

  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryArticleDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");


  async function loadStocksTab(){
    const data = await getAllArticles();
        if (Array.isArray(data.articles)) {
          setInventory(data.articles);
        }
          else {
          setError("Données invalides reçues du serveur");
        }
  }

    async function handleSubmit(e: React.FormEvent):Promise<void> {
      e.preventDefault();
      try {
        const res = await createArticle({name,unit});
        await loadStocksTab();
        console.log("opération réussie :", res);
        
      } catch (err) {
        console.error(err);
      }
    }

    async function handleDelete(id:number):Promise<void>{
      try{
        await deleteArticle(id)
        await loadStocksTab()
      }  
      catch(e){
        console.log(e)
      
    }
  }

useEffect((): void => {
  const fetchStocks = async (): Promise<void> => {
    try {
      await loadStocksTab();
    } catch (err: any) {
      setError(err.message);
    }
  };

  fetchStocks();
}, []);

   

  if (error) return <div>Error: {error}</div>;


    return (
      <>
      <Sidebar/>


       <h1>Stocks page</h1>

       <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="name"
          type="text"
        />
        <input
          onChange={(e) => setQuantity(Number(e.target.value))}
          value={quantity}
          placeholder="quantity"
          type="text"
        />
         <input
          onChange={(e) => setUnit(e.target.value)}
          value={unit}
          placeholder="unit"
          type="text"
        />
        <input type="submit" value="Submit" />
      </form>

        <table>
      <caption>
        
      </caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Quantiy</th>
          <th scope="col">Unit</th>
        </tr>
      </thead>
    <tbody>
      {inventory.map((item:any) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.unit}</td>
          <td>
            <button onClick={async ()=> await handleDelete(item.id)}>delete</button>
            <button onClick={async ()=> await navigate(`/inventory/${item.id}/edit`)}>modify</button>
          </td>
        </tr>
      ))}
    </tbody>

    </table>
</>
    );
  }