import type {  SupplierDTO } from "../../utils/types"
import { useNavigate } from "react-router-dom";

type Props = {
    supplier: SupplierDTO
    onDelete:(id:number)=>void;
};

export default function SupplierRow({supplier,onDelete}:Props){

    const navigate = useNavigate();

    return(
    <tr>
        <td>{supplier.contact_name}</td>
        <td>{supplier.mail}</td>
        <td>{supplier.phone}</td>
        <td>{supplier.address}</td>
        
            <td>
                <button className = "btn btn-outline-primary" onClick={()=> navigate("/admin/suppliers/"+supplier.id+"/edit")} >Modifier</button>
                <button className="btn btn-outline-danger" onClick={()=> onDelete(Number(supplier.id))}>Supprimer</button>
            </td>
        
    </tr>
    )
}