import type {SupplierDTO } from "../../utils/types";
import SupplierRow from "./supplier.row";


type Props = {
    suppliers: SupplierDTO[];
    onDelete:(id:number)=>void;
}

export default function SupplierTable({suppliers, onDelete}:Props){
    return(
        <table className ="table table-stripped">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Mail</th>
                    <th>Téléphone</th>
                    <th>Addresse</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map((supplier)=>(
                    <SupplierRow key={supplier.id} supplier={supplier} onDelete={onDelete}/>
                ))}
            </tbody>
        </table>
    )
}