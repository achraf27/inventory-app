import { useState } from "react"
import type { SupplierArticleDTO } from "../utils/types"
import { addArticleToInventory } from "../services/inventory.service"

type Props = {
    article: SupplierArticleDTO
};

export default function CatalogRow({article}:Props){
    const [quantity,setQuantity] = useState<string>("");

    const handleAdd = async () => {
        await addArticleToInventory(String(article.article_id),{quantity})

    }

    return(
    <tr>
        <td>{article.name}</td>
        
        <td>
            <input 
            type="number"
            min={1}
            value={quantity}
            onChange={(e)=> setQuantity(e.target.value)} 
            style={{width:"60px"}}/>
        </td>
        <td>{article.unit}</td>
        <td>
            <button onClick={handleAdd}>Ajouter</button>
        </td>
    </tr>
    )
}