import type { Request, Response } from "express";
import { inventoryRepository } from "../repositories/inventory.repository.js";




export class InventoryController{

    private inventoryRepo = new inventoryRepository();



    add = async (req: Request, res: Response) =>{
        const {user_id,article_id} = req.params;
        const { quantity } = req.body;
        try{
        if (!article_id || !user_id || !quantity) return res.status(400).json({ error: "missing fields" });

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
        
              if(!user_id) return res.status(400).json({error: "the id field is empty"})
        
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
        
              if(!article_id) return res.status(400).json({error: "the id field is empty"})
        
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
        
          console.log("id: " + article_id)
        
          try{
            if(!article_id) return res.status(400).json({ error: "the id field is empty"});
        
        
            await this.inventoryRepo.removeArticle(Number(user_id), Number(article_id));
            
            return res.status(200).json({message : "the article was successfully deleted"})
          }
          catch(e){
              console.log(e);
              return res.status(500).json({ error: "server error"});
          }
        }
}



export const inventoryController = new InventoryController();
