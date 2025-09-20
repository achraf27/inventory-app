import { user } from "../classes/user.js";

export interface userDao{
    insert(user:user):Promise<void>;
    updatePassword(id:string,password:string):Promise<void>;
    updateMail(id:string,mail:string):Promise<void>;
    delete(user:user):Promise<void>;
    findAll():Promise<user []>;
    findById(id:number):Promise<user []|undefined>;
}