import { inventoryDao } from "../dao/inventoryDao.js";
import type { InventoryRow } from "../types/inventoryRow.js";
import { inventory } from "../models/inventory.js";

export class inventoryRepository{

    private inventoryDao: inventoryDao = new inventoryDao();

    private mapTypeToObject(row:InventoryRow):inventory{
            return new inventory(row.user_id,row.article_id,row.quantity);
        }
    
        private mapObjectToType(_inventory:inventory):InventoryRow{
            return {
                user_id: _inventory.getUserId(),
                article_id: _inventory.getArticleId(),
                quantity: _inventory.getQuantity(),
            }
        }


        // a finir
    async getInventoryArticles(userId:number){
        await this.inventoryDao.findByUserId(userId);
    }

    async deleteArticle(userId:number,articleId:number):Promise<number>{
        const result = await this.inventoryDao.delete(userId,articleId)
        return result;
    }

    async addArticle(_inventory:inventory):Promise<number>{
        const row = this.mapObjectToType(_inventory);
        const resultat = await this.inventoryDao.insert(row);
        return resultat
    }

    async updateQuantity(userId:number,articleId:number,quantity:number):Promise<number>{
        const result = await this.inventoryDao.updateQuantity(userId,articleId,quantity)
        return result

    }
 
}
