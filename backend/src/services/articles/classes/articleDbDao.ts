import type { articleDao } from "../interfaces/articleDao.js";
import { article } from "./article.js";
import { Db } from "../../database/classes/dbSqlite.js";

export class articleDbDao implements articleDao{

    async insert(article: article):Promise<void>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO articles (name,quantity) VALUES (?,?)",
      article.getName(),
      article.getQuantity()

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

    async findAll(): Promise<article []> {
        const db = await Db.getConnection();
        return db.all("SELECT * FROM articles");
    }

    async findById(id:number): Promise<article | undefined> {
        const db = await Db.getConnection();
        return db.get("SELECT * FROM articles WHERE id = ?", id);
    }
}