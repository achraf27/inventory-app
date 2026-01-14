import { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getAllInventoryArticles } from "../services/inventory.service";
import { useAuth } from "../context/authContext";
import type { InventoryArticleDTO } from "../utils/types";


export default function Dashboard() {
   const {user} = useAuth();

  const [totalStock,setTotalStock] = useState<number|null>(null)
  const [lowStockCount,setLowStockCount] = useState<number|null>(null)
  const [recentArticles,setRecentArticles] = useState<InventoryArticleDTO[]>([])

  function formatDate(date:string|Date|undefined){
    if(!date) return'-';
    return new Date(date).toLocaleDateString('fr-FR');
  }

  async function loadStocks(){
    const res = await getAllInventoryArticles()
    setTotalStock(res.articles.length)
    setLowStockCount(res.articles.filter(a=>a.quantity<=5).length)
    const sorted = res.articles.sort((a, b) => {
    const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
    const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
    return dateB - dateA; // plus récent en premier
  });

  setRecentArticles(sorted);
  }


   useEffect(() => {
      loadStocks();
    }, []);
      return (
      
      < >
      
     <div className="flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen p-6">
  

  <div className="mb-8">
    <h1 className="text-3xl font-bold">Dashboard</h1>
    <p className="text-gray-500">
      Vue d’ensemble de votre inventaire
    </p>
  </div>


  
   {user?.role === "User" && (
<div className="d-flex flex-wrap gap-4 mb-4">
  <div className="flex-fill card">
    <div className="card-body">
      <h6 className="text-muted">Stock total</h6>
      <p className="h3">{totalStock} article(s)</p>
    </div>
  </div>

  <div className="flex-fill card">
    <div className="card-body">
      <h6 className="text-muted">Faible stock</h6>
      <p className="h3">{lowStockCount} article(s)</p>
    </div>
  </div>
</div>

)}


    <ul className="list-group list-group-flush">
      <h2>Articles recents</h2>
  {recentArticles.map(a => (
    <li key={a.article_id} className="list-group-item d-flex justify-content-between">
      <span>{a.name}</span>
      
      <span className="text-muted">{formatDate(a.addedAt)}</span>
    </li>
  ))}
</ul>


  

 
  <Outlet />

</div>

      </>
    );
  }