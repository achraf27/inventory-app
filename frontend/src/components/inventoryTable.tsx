import type { InventoryArticleDTO } from "../utils/types";
import InventoryRow from "./inventoryRow";

type Props = {
    articles: InventoryArticleDTO[];
    onDelete:(id:number)=>void;
    onUpdateQuantity: (id: number, newQuantity: string) => Promise<void>;
}

export default function InventoryTable({articles,onDelete,onUpdateQuantity}:Props){

    
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
                    <InventoryRow key={article.article_id} article={article} onDelete={onDelete} onUpdateQuantity={onUpdateQuantity}/>
                ))}
            </tbody>
        </table>
    )
}