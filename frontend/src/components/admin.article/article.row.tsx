import type {  ArticleDTO} from "../../utils/types"
import { useNavigate } from "react-router-dom";

type Props = {
    article: ArticleDTO
    onDelete:(id:number)=>void;
};

export default function ArticleRow({article,onDelete}:Props){

    const navigate = useNavigate();

    return(
    <tr>
        <td>{article.name}</td>
        <td>{article.unit}</td>
            <td><button className = "btn btn-dark me-2"  onClick={()=> navigate("/admin/articles/"+article.id+"/edit")} >Modifier</button>
            <button className = "btn btn-outline-danger"  onClick={()=> onDelete(Number(article.id))}>Supprimer</button>
        </td>
    </tr>
    )
}