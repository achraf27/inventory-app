import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function ProtectedLayout(){
    return(<>
    <Sidebar/>
    <main>
        <Outlet/>
    </main>
    </>)
}