import type { articleDao } from "../interfaces/articleDao.js";
import { article } from "./article.js";
import { Db } from "../../database/classes/dbSqlite.js";

export class articleDbDao implements articleDao{

    async insert(article: article,user_id:string):Promise<void>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO articles (name,quantity,unit,user_id) VALUES (?,?,?,?)",
      article.getName(),
      article.getQuantity(),
      article.getUnit(),
      user_id

    );
    if (result.lastID === undefined) {
        throw new Error("Failed to get last inserted ID");
      }
      article.setId(result.lastID);
      
  }

    async delete(id:number):Promise<void>{
        if (!id) {
            throw new Error('Cannot delete undefined article');
          }
        const db = await Db.getConnection();
        await db.run("DELETE FROM articles WHERE id = ?", id);

    }

    async findByUserId(id:number): Promise<article []> {
        const db = await Db.getConnection();
        return db.all("SELECT * FROM articles WHERE user_id = ?",id);
    }

    async findById(id:number): Promise<article | undefined> {
        const db = await Db.getConnection();
        return db.get("SELECT * FROM articles WHERE id = ?", id);
    }

    async updateName(id:string, name:string):Promise<number>{
        const db = await Db.getConnection()

       const result = await db.run("UPDATE articles set name = ?  WHERE id = ?",
            name,
            id
      );
      return result.changes!;
    }


    async updateQuantity(id:string, quantity:number):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE articles set quantity = ?  WHERE id = ?",
            quantity,
            id
      );
      return result.changes!;
    }

    async updateUnit(id:string, unit:number):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE articles set unit = ?  WHERE id = ?",
            unit,
            id
      );
      return result.changes!;
    }

    async updateArticle(id_article:number, name:string, quantity:number,unit:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE articles SET name = ?, quantity = ?, unit = ? WHERE id = ?",
            name,
            quantity,
            unit,
            id_article
      );
      return result.changes!;
    }
}