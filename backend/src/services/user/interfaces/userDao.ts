import { user } from "../classes/user.js";

export interface userDao{
    insert(user:user):Promise<number>;
    updatePassword(id:string,password:string):Promise<number>;
    updateMail(id:string,mail:string):Promise<number>;
    delete(id:number):Promise<void>;
    findAll():Promise<user []>;
    findById(id:number):Promise<user|undefined>;
    findByEmail(mail:string):Promise<user|undefined>;
    findByUsername(name:string):Promise<user|undefined>;
}