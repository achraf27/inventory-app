import type { Request, Response } from "express";
import { articleRepository } from "../repositories/article.repository.js";




export class ArticleController{

    private articleRepo = new articleRepository();



    create = async (req: Request, res: Response) =>{
        const { name, unit } = req.body;
        try{
        if (!name || !unit) return res.status(400).json({ error: "missing fields" });

        const article = await this.articleRepo.createArticle({ name, unit });
        return res.status(200).json(article.toDto());
        }
        catch(e){
            return res.status(500).json({ error: "server error"});
        }
    }

    
    getArticle = async (req:Request, res:Response) => {
        const {id_article} = req.params;
            try{
        
              if(!id_article) return res.status(400).json({error: "the id field is empty"})
        
              const article = await this.articleRepo.getArticle(Number(id_article));

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

    update = async  (req:Request, res:Response)=>{
        const {id_article} = req.params;
        const {name,unit,quantity} = req.body;
        try{
    
          if(!id_article ||(!unit  && !name && !quantity)) return res.status(400).json({error: "the fields are empty"})
    
    
          await this.articleRepo.updateArticle(Number(id_article),{name,unit})
    
          return res.status(200).json({message:"article unit changed successfully"})
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ error: "the article was not found"});
        }
    }

       delete = async (req:Request, res:Response)=>{
          const {id_article}= req.params;
        
          console.log("id: " + id_article)
        
          try{
            if(!id_article) return res.status(400).json({ error: "the id field is empty"});
        
        
            await this.articleRepo.deleteArticle(Number(id_article));
            return res.status(200).json({message : "the article was successfully deleted"})
          }
          catch(e){
              console.log(e);
              return res.status(500).json({ error: "server error"});
          }
        }
}



export const articleController = new ArticleController();
