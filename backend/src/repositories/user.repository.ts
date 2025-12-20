import { UserDao } from "../dao/user.dao.js";
import type { UserRow } from "../types/userRow.js";
import { User } from "../models/user.js";

type CreateUserInput = {
  role: string;
  name: string;
  mail: string;
  passwordHash: string;
};


export class UserRepository{

    private UserDao: UserDao;

    constructor(dao = new UserDao()) {
        this.UserDao = dao;
    }

    private mapRowToUser(row:UserRow):User{
        return new User(row.role,row.name,row.mail,row.passwordHash,row.id);
    }

    
    public async getUser(param:number|string):Promise<User|undefined>{
        
        if(typeof param === "number"){
            const row = await this.UserDao.findById(param);
            return row? this.mapRowToUser(row) : undefined;
        }

        if(param.includes("@")){
            const row = await this.UserDao.findByEmail(param);
            return row? this.mapRowToUser(row):undefined;
        }
        
        const row = await this.UserDao.findByUsername(param);
        return row? this.mapRowToUser(row):undefined;
    }

    public async getAllUsers():Promise<User[] | undefined>{
        const rows = await this.UserDao.findAll();
        return  rows.map(row => new User(
        row.role,
        row.name,
        row.mail,
        row.passwordHash,
        row.id 
    ));
    }

    public async createUser(_user:CreateUserInput):Promise<User>{

         const newUser = new User(_user.role,_user.name,_user.mail,_user.passwordHash);
         const id = await this.UserDao.insert(_user);
         newUser.id = id;
         return newUser;
    }

    public async deleteUser(id:number): Promise<boolean>{
        const changes = await this.UserDao.delete(id);
        return changes > 0;
    }

    public async updateMail(_id:number,_mail:string):Promise<boolean>{
        const changes = await this.UserDao.updateMail(_id,_mail);
        return changes > 0;
    }

    async updatePassword(_id:number,_password:string):Promise<boolean>{
        const changes = await this.UserDao.updatePassword(_id,_password);
        return changes > 0;
    }

     async updateRole(_id:number,_role:string):Promise<boolean>{
        const changes = await this.UserDao.updateRole(_id,_role);
        return changes > 0;
    }
}
