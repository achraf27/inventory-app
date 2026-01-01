import type {UserDTO } from "../../utils/types";
import CatalogRow from "./user.row";

type Props = {
    users: UserDTO[];
}

export default function UserTable({users}:Props){
    return(
        <table>
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Nom</th>
                    <th>Mail</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                    <CatalogRow key={user.id} user={user}/>
                ))}
            </tbody>
        </table>
    )
}