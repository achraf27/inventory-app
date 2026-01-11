import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function ProtectedLayout(){
    return(<div className="container-fluid">
        <div className="row">
            <Sidebar/>
            <main className="col p-4">
                <Outlet/>
            </main>
        </div>
    </div>)
}