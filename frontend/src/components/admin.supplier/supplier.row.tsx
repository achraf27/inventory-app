import type {  SupplierDTO } from "../../utils/types"

type Props = {
    supplier: SupplierDTO
};

export default function SupplierRow({supplier}:Props){

    // const handleAdd = async () => {
    //     await addArticleToInventory(String(user.id),{quantity})

    // }

    return(
    <tr>
        <td>{supplier.contact_name}</td>
        <td>{supplier.mail}</td>
        <td>{supplier.phone}</td>
        <td>{supplier.address}</td>
        
            <button>Modifier</button>
            <button>Supprimer</button>
        
    </tr>
    )
}