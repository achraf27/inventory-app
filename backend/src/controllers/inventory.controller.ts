import type { Request, Response } from "express";
import { InventoryRepository } from "../repositories/inventory.repository.js";




export class InventoryController{

    private inventoryRepo = new InventoryRepository();



    add = async (req: Request, res: Response) =>{
        const {user_id,article_id} = req.params;
        const { quantity } = req.body;
        try{

        const article = await this.inventoryRepo.addArticle({articleId :Number(article_id), userId: Number(user_id), quantity:Number(quantity)});
        return res.status(200).json(article);
        }
        catch(e){
            return res.status(500).json({ error: "server error"});
        }
    }


     getAllArticles = async (req:Request, res:Response) => {
        const {user_id} = req.params;
            try{
        
        
              const article = await this.inventoryRepo.getAllInventoryArticles(Number(user_id));
              
              console.log(article);
        
              if(!article) return res.status(404).json({error:"Article not found"});
        
        
              return res.status(200).json({
                                     message:"article retrived successfully",
                                     article: article 
                                    })
           
            }
            catch(e){
                console.log(e);
                return res.status(500).json({ error: "the article was not found"});
            }
    }
    
    getOneArticle = async (req:Request, res:Response) => {
        const {user_id,article_id} = req.params;
            try{
        
        
              const article = await this.inventoryRepo.getOneInventoryArticle(Number(article_id),Number(user_id));
              
              console.log(article);
        
              if(!article) return res.status(404).json({error:"Article not found"});
        
        
              return res.status(200).json({
                                     message:"article retrived successfully",
                                     article: article 
                                    })
           
            }
            catch(e){
                console.log(e);
                return res.status(500).json({ error: "the article was not found"});
            }
    }


       delete = async (req:Request, res:Response)=>{
          const {user_id,article_id} = req.params;
        
        
          try{
        
        
            await this.inventoryRepo.removeArticle(Number(user_id), Number(article_id));
            
            return res.status(200).json({message : "the article was successfully deleted"})
          }
          catch(e){
              console.log(e);
              return res.status(500).json({ error: "server error"});
          }
        }


       updateQuantity = async (req:Request, res:Response)=>{
          const {user_id,article_id} = req.params;
          const {quantity} = req.body;
          try{
        
        
            await this.inventoryRepo.updateQuantity(Number(user_id), Number(article_id),Number(quantity));
            
            return res.status(200).json({message : "the article was successfully updated"})
          }
          catch(e){
              console.log(e);
              return res.status(500).json({ error: "server error"});
          }
        }


}



export const inventoryController = new InventoryController();
