import  type { ArticleRow } from "../types/articleRow.js";
import { Db } from "../database/dbSqlite.js";

export class ArticleDao{

    async insert(article: Omit<ArticleRow,"id">):Promise<number>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO articles (name,unit) VALUES (?,?)",
      article.name,
      article.unit
    );
    if (result.lastID === undefined) {
        throw new Error("Failed to get last inserted ID");
      }

      return result.lastID;
      
  }

    async delete(id:number):Promise<number>{
        if (!id) {
            throw new Error('Cannot delete undefined article');
          }
        const db = await Db.getConnection();
        const result = await db.run("DELETE FROM articles WHERE id = ?", id);
        return result.changes!;

    }

    async findById(id:number): Promise<ArticleRow | undefined> {
        const db = await Db.getConnection();
        const row = await db.get("SELECT * FROM articles WHERE id = ?", id);
        return row as ArticleRow|undefined;
    }


    async updateName(id:number, name:string):Promise<number>{
        const db = await Db.getConnection()

       const result = await db.run("UPDATE articles set name = ?  WHERE id = ?",
            name,
            id
      );
      return result.changes!;
    }


    async updateUnit(id:number, unit:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE articles set unit = ?  WHERE id = ?",
            unit,
            id
      );
      return result.changes!;
    }

   
}