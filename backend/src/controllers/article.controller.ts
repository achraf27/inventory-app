import type { Request, Response } from "express";
import { ArticleRepository } from "../repositories/article.repository.js";

export class ArticleController{

    private articleRepo = new ArticleRepository();



    create = async (req: Request, res: Response) =>{
        const { name, unit } = req.body;
        try{
        const article = await this.articleRepo.createArticle({ name, unit });
        return res.status(200).json({message: "article successfully created",
                                    article:article
        });
        }
        catch(e){
            return res.status(500).json({ message: "server error"});
        }
    }

    
    getArticle = async (req:Request, res:Response) => {
        const {article_id} = req.params;
            try{
        
        
              const article = await this.articleRepo.getArticle(Number(article_id));

              console.log(article);
        
              if(!article) return res.status(404).json({message:"article not found"});
        
        
              return res.status(200).json({
                                     message:"article retrived successfully",
                                     article: article 
                                    })
           
            }
            catch(e){
                console.log(e);
                return res.status(500).json({ message: "server error"});
            }
    }

     getAllArticles = async (req:Request, res:Response) => {
            try{
        
        
              const articles = await this.articleRepo.getAllArticles();

              console.log(articles);
        
              if(!articles) return res.status(404).json({message:"articles not found"});
        
        
              return res.status(200).json({
                                     message:"article retrived successfully",
                                     articles: articles 
                                    })
           
            }
            catch(e){
                console.log(e);
                return res.status(500).json({ message: "server error"});
            }
    }

    update = async  (req:Request, res:Response)=>{
        const {article_id} = req.params;
        const {name,unit} = req.body;
        try{
    
    
          await this.articleRepo.updateArticle(Number(article_id),{name,unit})
    
          return res.status(200).json({message:"article updated successfully"})
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error"});
        }
    }

       delete = async (req:Request, res:Response)=>{
          const {article_id}= req.params;
        
          try{        
            await this.articleRepo.deleteArticle(Number(article_id));
            return res.status(200).json({message : "article successfully deleted"})
          }
          catch(e){
              console.log(e);
              return res.status(500).json({ message: "server error"});
          }
        }
}



export const articleController = new ArticleController();
