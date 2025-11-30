import { userDao } from "../dao/userDao.js";
import type { UserRow } from "../types/userRow.js";
import { user } from "../models/user.js";

export class userRepository{

    private UserDao: userDao = new userDao();



    private mapTypeToObject(row:UserRow):user{
        return new user(row.role,row.name,row.password,row.mail);
    }

    private mapObjectToType(_user:user):Omit<UserRow,"id">{
        return {
            role: _user.getRole(),
            name: _user.getName(),
            mail: _user.getMail(),
            password: _user.getPassword(),
        }
    }

    public async getUser(param:number|string):Promise<UserRow|undefined>{
        
        if(typeof param === "number"){
            const row = await this.UserDao.findById(param);
            return row? this.mapTypeToObject(row) : undefined;
        }

        if(param.includes("@")){
            const row = await this.UserDao.findByEmail(param);
            return row? this.mapTypeToObject(row):undefined;
        }
        const row = await this.UserDao.findByUsername(param);
        return row? this.mapTypeToObject(row):undefined;
    }

    public async getAllUsers():Promise<user[] | undefined>{
        const rows = await this.UserDao.findAll();
        return  rows.map(row => new user(
        row.role,
        row.name,
        row.mail,
        row.password,
        row.id
    ));
    }

    public async createUser(_user:user):Promise<user>{

        const row = this.mapObjectToType(_user)
        const id = await this.UserDao.insert(row);
        _user.setId(id);
        return _user;
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
