import { InventoryDao } from "../dao/inventory.dao.js";
import type { InventoryArticleRow } from "../types/inventoryRow.js";
import { Inventory } from "../models/inventory.js";
import { InventoryArticle } from "../models/inventoryArticle.js";

type CreateInventoryInput = {
 userId:number,
 articleId:number,
 quantity:number
};


export class InventoryRepository{

    private inventoryDao: InventoryDao;

    constructor(dao = new InventoryDao()) {
        this.inventoryDao = dao;
    }

    private mapRowToInventoryArticle(row:InventoryArticleRow):InventoryArticle{
            return new InventoryArticle(
                                                 row.user_id,
                                                 row.article_id,
                                                 row.name,
                                                 row.quantity,
                                                 row.unit);
        }

    async addArticle(_inventory:CreateInventoryInput):Promise<Inventory>{
        const newInventory = new Inventory(_inventory.articleId,_inventory.userId,_inventory.quantity);
        await this.inventoryDao.insert({user_id: _inventory.userId,article_id: _inventory.articleId,quantity: _inventory.quantity});
        return newInventory;
    }

    async getAllInventoryArticles(userId:number):Promise<InventoryArticle[]>{
        const rows = await this.inventoryDao.findByUserId(userId);
        return rows!.map(row => this.mapRowToInventoryArticle(row));
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
