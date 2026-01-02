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

            <td><button onClick={()=> navigate("/admin/users/"+user.id+"/edit")}>Modifier</button></td>
            <td><button onClick={()=> onDelete(Number(user.id))}>Supprimer</button></td>
        
    </tr>
    )
}