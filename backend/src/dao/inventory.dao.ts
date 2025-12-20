import type { InventoryArticleRow, InventoryRow } from "../types/inventoryRow.js";
import { Db } from "../database/dbSqlite.js";

export class InventoryDao{

    async insert(inventory: InventoryRow):Promise<number>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO inventory (article_id,user_id,quantity) VALUES (?,?,?)",
      inventory.article_id,
      inventory.user_id,
      inventory.quantity
    );
    
    return result.changes!;
  }

    async delete(userId:number,articleId:number):Promise<number>{
        if (userId === undefined || articleId === undefined) {
            throw new Error('Cannot delete undefined inventory');
          }
        const db = await Db.getConnection();
        const result = await db.run("DELETE FROM inventory WHERE article_id = ? AND user_id = ?", articleId,userId);
        return result.changes!;

    }

    async findByUserId(id:number): Promise<InventoryArticleRow [] |  undefined> {
         const db = await Db.getConnection();
         const row = await db.all(`
              SELECT i.user_id, i.article_id, i.quantity, a.name, a.unit
              FROM inventory i
              JOIN articles a ON i.article_id = a.id
              WHERE i.user_id = ?
          `, [id]);
          return row as InventoryArticleRow[];
    }

   async findOneArticle(userId: number, articleId: number): Promise<InventoryArticleRow | undefined> {
    const db = await Db.getConnection();
    const row = await db.get(`
        SELECT i.user_id, i.article_id, i.quantity, a.name, a.unit
        FROM inventory i
        JOIN articles a ON i.article_id = a.id
        WHERE i.user_id = ? AND i.article_id = ?
    `, [userId, articleId]);
    return row as InventoryArticleRow;
}


    async updateQuantity(userId:number,articleId:number, quantity:number){
        const db = await Db.getConnection();
        const result = await db.run("UPDATE inventory set quantity = ?  WHERE user_id = ? AND article_id = ?",
            quantity,
            userId,
            articleId
      );
      return result.changes!;
    }
   
}