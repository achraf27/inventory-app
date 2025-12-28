import type { SupplierArticleDTO } from "../utils/types";
import CatalogRow from "./catalogRow";

type Props = {
    articles: SupplierArticleDTO[];
}

export default function CatalogTable({articles}:Props){
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
                    <CatalogRow key={article.article_id} article={article}/>
                ))}
            </tbody>
        </table>
    )
}