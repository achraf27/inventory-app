import { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getAllInventoryArticles } from "../services/inventory.service";
import { useAuth } from "../context/authContext";


export default function Dashboard() {
   const {user} = useAuth();

  const [totalStock,setTotalStock] = useState<number|null>(null)

  async function loadStocks(){
    const res = await getAllInventoryArticles()

    setTotalStock(res.articles.length)
  }


   useEffect(() => {
      loadStocks();
    }, []);
      return (
      
      < >
      
     <div className="flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen p-6">
  
  {/* Header */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold">Dashboard</h1>
    <p className="text-gray-500">
      Vue d’ensemble de votre inventaire
    </p>
  </div>

  {/* KPIs */}
  <div className="flex gap-4 mb-8">
    {user?.role === "User" && (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-500">Stock total</p>
        <p className="text-3xl font-bold">{totalStock}</p>
      </div>
    )}
  </div>

  {/* Sous-pages */}
  <Outlet />

</div>

      </>
    );
  }