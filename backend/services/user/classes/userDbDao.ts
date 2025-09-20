import type { userDao } from "../interfaces/userDao.js";
import { user } from "./user.js";
import { Db } from "../../database/classes/dbSqlite.js";

export class userDbDao implements userDao{

    async insert(user: user):Promise<void>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO users (name, mail, password) VALUES (?, ?, ?)",
      user.name,
      user.mail,
      user.password
    );
    user.setId(result.lastID);
  }


    async updatePassword(id:string, password:string):Promise<void>{
        const db = await Db.getConnection()

        await db.run("UPDATE users set password = ?  WHERE id = ?",
            password,
            id
      );
    }

    async updateMail(id:string, mail:string):Promise<void>{
        const db = await Db.getConnection()

        await db.run("UPDATE users set mail = ?  WHERE id = ?",
            mail,
            id
      );
    }

    async delete(user:user):Promise<void>{
        const db = await Db.getConnection();
        await db.run("DELETE FROM Event WHERE id = ?", user.getId());

    }

    async findAll(): Promise<user []> {
        const db = await Db.getConnection();
        return db.all("SELECT * FROM user");
    }

    async findById(id:number): Promise<user [] | undefined> {
        const db = await Db.getConnection();
        return db.get("SELECT * FROM Event WHERE id = ?", id);
    }
}