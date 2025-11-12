import type { userDao } from "../interfaces/userDao.js";
import { user } from "./user.js";
import { Db } from "../../database/classes/dbSqlite.js";

export class userDbDao implements userDao{

    async insert(user: user):Promise<number>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO users (name, mail, password) VALUES (?, ?, ?)",
      user.getName(),
      user.getMail(),
      user.password
    );
    if (result.lastID === undefined) {
        throw new Error("Failed to get last inserted ID");
      }
      user.setId(result.lastID);
    return result.lastID;
      
  }


    async updatePassword(id:string, password:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE users set password = ?  WHERE id = ?",
            password,
            id
      );
      return result.changes!;
    }

    async updateMail(id:string, mail:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE users set mail = ?  WHERE id = ?",
            mail,
            id
      );
      return result.changes!;
    }

    async delete(id:number):Promise<void>{
        if (!id) {
            throw new Error('Cannot delete undefined user');
          }
        const db = await Db.getConnection();
        await db.run("DELETE FROM users WHERE id = ?", id);

    }

    async findAll(): Promise<user []> {
        const db = await Db.getConnection();
        return db.all("SELECT * FROM users");
    }

    async findById(id:number): Promise<user | undefined> {
        const db = await Db.getConnection();
        return db.get("SELECT * FROM users WHERE id = ?", id);
    }

    async findByEmail(mail:string): Promise<user | undefined> {
        const db = await Db.getConnection();
        return db.get("SELECT * FROM users WHERE mail = ?", mail);
    }

    async findByUsername(name:string): Promise<user | undefined> {
        const db = await Db.getConnection();
        return db.get("SELECT * FROM users WHERE name = ?", name);
    }
}