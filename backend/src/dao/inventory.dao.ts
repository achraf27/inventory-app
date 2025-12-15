import type { InventoryRow } from "../types/inventoryRow.js";
import { Db } from "../database/dbSqlite.js";

export class inventoryDao{

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

    async findByUserId(id:number): Promise<InventoryRow [] |  undefined> {
        const db = await Db.getConnection();
        const rows = await db.all("SELECT * FROM inventory WHERE user_id = ?",id);
        return rows as InventoryRow[];
    }

    async findOneArticle(userId:number,articleId:number):Promise<InventoryRow | undefined>{
        const db = await Db.getConnection();
        const row = await db.get("SELECT * FROM inventory WHERE article_id = ? AND user_id = ?",articleId,userId);
        return row as InventoryRow;
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