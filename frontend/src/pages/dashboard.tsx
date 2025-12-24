import { Outlet } from "react-router-dom";
import  Sidebar  from "../components/sidebar"

export default function Dashboard() {
      return (
      
      < >
      
      <Sidebar/>
      <h1>DashBoard</h1>
      <div className = 'flex'>
        

            <div className = 'flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen'>
                <Outlet/>
            </div>

        </div>
      </>
    );
  }