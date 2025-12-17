import { InventoryDao } from "../dao/inventory.dao.js";
import type { InventoryRow } from "../types/inventoryRow.js";
import { Inventory } from "../models/inventory.js";
import type { Article } from "../models/article.js";

type CreateInventoryInput = {
 userId:number,
 articleId:number,
 quantity:number
};

type inventoryArticle = Article & {quantity:number}

export class inventoryRepository{

    private inventoryDao: InventoryDao;

    constructor(dao = new InventoryDao()) {
        this.inventoryDao = dao;
    }

    private mapRowToInventory(row:InventoryRow):Inventory{
            return new Inventory(row.user_id,row.article_id,row.quantity);
        }

    async addArticle(_inventory:CreateInventoryInput):Promise<Inventory>{
        const newInventory = new Inventory(_inventory.articleId,_inventory.userId,_inventory.quantity);
        await this.inventoryDao.insert(newInventory);
        return newInventory;
    }

    async getAllInventoryArticles(userId:number):Promise<inventoryArticle[]|undefined>{
        const rows = await this.inventoryDao.findByUserId(userId);
        return rows!.map(row => {
            const article = new Article(row.name,row.unit,row.article_id);
            return {...article,quantity: row.quantity}});
    }

    async getOneInventoryArticle(userId:number,articleId:number):Promise<InventoryRow|undefined>{
        const row = await this.inventoryDao.findOneArticle(userId,articleId);
        return row? this.mapRowToInventory(row):undefined;
    }

    async removeArticle(userId:number,articleId:number):Promise<number>{
        const result = await this.inventoryDao.delete(userId,articleId)
        return result;
    }


    async updateQuantity(userId:number,articleId:number,quantity:number):Promise<boolean>{
        return await this.inventoryDao.updateQuantity(userId,articleId,quantity) >  0
    }
 
}
