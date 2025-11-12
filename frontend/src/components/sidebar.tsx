import { useNavigate } from "react-router-dom";

export default function Sidebar(){

    const navigate = useNavigate();

    return(
        <>
        <div className="flex">
            <a onClick={()=>{navigate("/Dashboard")}}> Dashboard </a>
            <a onClick={()=>{navigate("/stocks")}}> Products </a>
            <a href=""> LogOut</a>
        </div>
        </>
    )
}