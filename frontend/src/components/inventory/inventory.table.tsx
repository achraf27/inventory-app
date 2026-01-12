import type { InventoryArticleDTO } from "../../utils/types";
import InventoryRow from "./inventory.row";

type Props = {
    articles: InventoryArticleDTO[];
    onDelete:(id:number)=>void;
    onUpdateQuantity: (id: number, newQuantity: string) => Promise<void>;
}

export default function InventoryTable({articles,onDelete,onUpdateQuantity}:Props){

    
    return(
        <table className="table table-stripped">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Quantité</th>
                    <th>Unité</th>
                    <th>Date d'ajout</th>
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