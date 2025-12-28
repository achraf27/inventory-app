import type { Request, Response } from "express";
import { InventoryRepository } from "../repositories/inventory.repository.js";




export class InventoryController{

    private inventoryRepo = new InventoryRepository();



    add = async (req: Request, res: Response) =>{
        const user_id = (req as any).user.id;
        const {article_id} = req.params;
        const { quantity } = req.body;
        try{

        const article = await this.inventoryRepo.addArticle({articleId :Number(article_id), userId: Number(user_id), quantity:Number(quantity)});
        return res.status(200).json({
                                message: "Article successfully added",
                                article: article});
        }
        catch(e){
            return res.status(500).json({ message: "Server error."});
        }
    }


     getAllArticles = async (req:Request, res:Response) => {
        const user_id = (req as any).user.id;
            try{
        
        
              const article = await this.inventoryRepo.getAllInventoryArticles(Number(user_id));
              
              console.log(article);
        
              if(!article) return res.status(404).json({error:"Article not found"});
        
        
              return res.status(200).json({
                                     message:"Articles retrived successfully",
                                     articles: article 
                                    })
           
            }
            catch(e){
                console.log(e);
                return res.status(500).json({ message: "Server error."});
            }
    }
    
    getOneArticle = async (req:Request, res:Response) => {
      const user_id = (req as any).user.id;
        const {article_id} = req.params;
            try{
        
        
              const article = await this.inventoryRepo.getOneInventoryArticle(Number(article_id),Number(user_id));
              
              console.log(article);
        
              if(!article) return res.status(404).json({error:"Article not found"});
        
        
              return res.status(200).json({
                                     message:"Article retrived successfully",
                                     article: article 
                                    })
           
            }
            catch(e){
                console.log(e);
                return res.status(500).json({ message: "Server error."});
            }
    }


       delete = async (req:Request, res:Response)=>{
          const user_id = (req as any).user.id;
          const {article_id} = req.params;
        
        
          try{

            console.log("DELETE inventory", {
              user_id,
              article_id
            });

            const result = await this.inventoryRepo.removeArticle(Number(user_id), Number(article_id));
            
            if(result) return res.status(200).json({message : "The article was successfully deleted."})

            return res.status(404).json({message : "Article not found in inventory."})
          }
          catch(e){
              console.log(e);
              return res.status(500).json({ message: "Server error."});
          }
        }


       updateQuantity = async (req:Request, res:Response)=>{
          const user_id = (req as any).user.id;
          const {article_id} = req.params;
          const {quantity} = req.body;
          try{
        
        
            await this.inventoryRepo.updateQuantity(Number(user_id), Number(article_id),Number(quantity));
            
            return res.status(200).json({message : "The article was successfully updated."})
          }
          catch(e){
              console.log(e);
              return res.status(500).json({ message: "Server error."});
          }
        }


}



export const inventoryController = new InventoryController();
