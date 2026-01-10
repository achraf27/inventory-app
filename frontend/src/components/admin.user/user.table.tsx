import type {UserDTO } from "../../utils/types";
import UserRow from "./user.row";

type Props = {
    users: UserDTO[];
    onDelete:(id:number)=>void;
}

export default function UserTable({users,onDelete}:Props){
    return(
        <table className ="table table-stripped">
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Nom</th>
                    <th>Mail</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                    <UserRow key={user.id} user={user} onDelete ={onDelete}/>
                ))}
            </tbody>
        </table>
    )
}