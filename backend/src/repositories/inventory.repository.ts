import { inventoryDao } from "../dao/inventory.dao.js";
import type { InventoryRow } from "../types/inventoryRow.js";
import { Inventory } from "../models/inventory.js";

type CreateInventoryInput = {
 userId:number,
 articleId:number,
 quantity:number
};


export class inventoryRepository{

    private inventoryDao: inventoryDao = new inventoryDao();

    private mapRowToInventory(row:InventoryRow):Inventory{
            return new Inventory(row.user_id,row.article_id,row.quantity);
        }
    

    async getAllInventoryArticles(userId:number):Promise<InventoryRow[]|undefined>{
        const rows = await this.inventoryDao.findByUserId(userId);
        return rows!.map(row => this.mapRowToInventory(row));
    }

    async getOneInventoryArticle(userId:number,articleId:number):Promise<InventoryRow|undefined>{
        const row = await this.inventoryDao.findOneArticle(userId,articleId);
        return row;
    }

    async deleteArticle(userId:number,articleId:number):Promise<number>{
        const result = await this.inventoryDao.delete(userId,articleId)
        return result;
    }

    async addArticle(_inventory:CreateInventoryInput):Promise<number>{
        return await this.inventoryDao.insert({article_id :_inventory.articleId, user_id:_inventory.userId,quantity:_inventory.quantity});
        
    }

    async updateQuantity(userId:number,articleId:number,quantity:number):Promise<boolean>{
        return await this.inventoryDao.updateQuantity(userId,articleId,quantity) >  0
        

    }
 
}
