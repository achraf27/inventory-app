import type { InventoryArticleDTO } from "../utils/types";
import InventoryRow from "./inventoryRow";

type Props = {
    articles: InventoryArticleDTO[];
}

export default function InventoryTable({articles}:Props){
    return(
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Unite</th>
                    <th>Quantité</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article)=>(
                    <InventoryRow key={article.article_id} article={article}/>
                ))}
            </tbody>
        </table>
    )
}