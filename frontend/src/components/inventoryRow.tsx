import { use, useState } from "react";
import type { InventoryArticleDTO } from "../utils/types"
import { removeArticleFromInventory } from "../services/inventory.service";
type Props = {
    article: InventoryArticleDTO
};

export default function InventoryRow({article}:Props){
    const [message,setMessage]=useState<String|null>("")


    const handleDelete = async () => {
        setMessage(null);
        const result = await removeArticleFromInventory(String(article.article_id))
        setMessage(result.message);


    }

    return(
        <>
        {message && <p style={{color:"green"}}>{message}</p>}
     <tr key={article.article_id}>
                <td>{article.name}</td>
                <td>{article.quantity}</td>
                <td>{article.unit}</td>
                <td>
                  <button onClick={async () => await handleDelete()}>Delete</button>
                  {/* <button onClick={() => navigate(`/inventory/${item.articleId}/edit`)}>Modify</button> */}
                </td>
    </tr>
    </>
    )
}