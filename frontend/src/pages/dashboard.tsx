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
      
      <div className = 'flex'>
        

            <div className = 'flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen'>
                <Outlet/>
                <h1>Bienvenue</h1>


      {user?.role === "User" && (
                <h2>Stock total: {totalStock}</h2>
                )}
            </div>
            

        </div>
      </>
    );
  }