import { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import  Sidebar  from "../components/sidebar"
import { getAllInventoryArticles } from "../services/inventory.service";


export default function Dashboard() {

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
      
      <Sidebar/>
      <div className = 'flex'>
        

            <div className = 'flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen'>
                <Outlet/>
                <h1>Bienvenue</h1>
                <h2>Stock total: {totalStock}</h2>
            </div>

        </div>
      </>
    );
  }