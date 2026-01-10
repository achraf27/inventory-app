import type {ArticleDTO } from "../../utils/types";
import ArticleRow from "./article.row";


type Props = {
    articles: ArticleDTO[];
    onDelete:(id:number)=>void;
}

export default function ArticleTable({articles, onDelete}:Props){
    return(
        <table className ="table table-stripped">
            <thead className="z">
                <tr>
                    <th>Nom</th>
                    <th>Unité</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article)=>(
                    <ArticleRow key={article.id} article={article} onDelete={onDelete}/>
                ))}
            </tbody>
        </table>
    )
}