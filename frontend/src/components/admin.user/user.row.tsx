import type {  UserDTO } from "../../utils/types"
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/user.service";

type Props = {
    user: UserDTO
};

export default function UserRow({user}:Props){

    const navigate = useNavigate();

    async function handleDelete(){
        // try{
        //     await deleteUser(user.id)
        // }
        // catch(err:any){
        //     console.log(err)
        // }
    }

    return(
    <tr>
        <td>{user.role}</td>
        <td>{user.name}</td>
        <td>{user.mail}</td>
            <button onClick={()=> navigate("/admin/users/"+user.id+"/edit")}>Modifier</button>
            <button onClick={async ()=> await handleDelete()}>Supprimer</button>
        
    </tr>
    )
}