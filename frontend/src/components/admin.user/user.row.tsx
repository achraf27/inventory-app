import type {  UserDTO } from "../../utils/types"
import { useNavigate } from "react-router-dom";

type Props = {
    user: UserDTO
    onDelete:(id:number)=>void;
};

export default function UserRow({user,onDelete}:Props){

    const navigate = useNavigate();

    return(
    <tr>
        <td>{user.role}</td>
        <td>{user.name}</td>
        <td>{user.mail}</td>

            <td>
                <button className = "btn btn-dark me-2" onClick={()=> navigate("/admin/users/"+user.id+"/edit")}>Modifier</button>
                <button className = "btn btn-outline-danger" onClick={()=> onDelete(Number(user.id))}>Supprimer</button>
            </td>
        
    </tr>
    )
}