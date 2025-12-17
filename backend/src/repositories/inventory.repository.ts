import { InventoryDao } from "../dao/inventory.dao.js";
import type { InventoryRow } from "../types/inventoryRow.js";
import { Inventory } from "../models/inventory.js";
import { InventoryArticle } from "../models/inventoryArticle.js";

type CreateInventoryInput = {
 userId:number,
 articleId:number,
 quantity:number
};


export class inventoryRepository{

    private inventoryDao: InventoryDao;

    constructor(dao = new InventoryDao()) {
        this.inventoryDao = dao;
    }

    private mapRowToInventoryArticle(row:InventoryRow):InventoryArticle{
            return new InventoryArticle(row.article_id,
                                                 row.user_id,
                                                 row.name ?? "Unknown",
                                                 row.quantity,
                                                 row.unit ?? "Unknown");
        }

    async addArticle(_inventory:CreateInventoryInput):Promise<Inventory>{
        const newInventory = new Inventory(_inventory.articleId,_inventory.userId,_inventory.quantity);
        await this.inventoryDao.insert(newInventory);
        return newInventory;
    }

    async getAllInventoryArticles(userId:number):Promise<InventoryArticle[]>{
        const rows = await this.inventoryDao.findByUserId(userId);
        return rows!.map(row => {
            const article = new InventoryArticle(row.article_id,
                                                 row.user_id,
                                                 row.name ?? "Unknown",
                                                 row.quantity,
                                                 row.unit ?? "Unknown");
            return article});
    }

    async getOneInventoryArticle(userId:number,articleId:number):Promise<InventoryArticle|undefined>{
        const row = await this.inventoryDao.findOneArticle(userId,articleId);
        return row? this.mapRowToInventoryArticle(row):undefined;
    }

    async removeArticle(userId:number,articleId:number):Promise<boolean>{
        return await this.inventoryDao.delete(userId,articleId) > 0
        
    }


    async updateQuantity(userId:number,articleId:number,quantity:number):Promise<boolean>{
        return await this.inventoryDao.updateQuantity(userId,articleId,quantity) >  0
    }
 
}
