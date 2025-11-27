import { Router } from 'express';
import type { Request, Response } from "express";
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';
import { article } from '../models/article.js';
import authMiddleware from '../middlewares/authMiddleware.js';



const router = Router();
const factory = new DAODbFactory;
const articleDb = factory.createArticleDAO();

router.post('/',authMiddleware, async (req:Request, res:Response) => {
  const { name, quantity,unit,user_id } = req.body;
 
  

  try{

    if(!name || !quantity || !unit || !user_id ) return res.status(400).json({ error: "the fields are empty"});


    const Article:article = new article(name,quantity,unit);
    await articleDb.insert(Article,user_id)
    return res.status(200).json({ message: "article: "+ name + " created",
                                  id:Article.getId()
    });
  }catch(e){
    console.log(e)
    return res.status(500).json({ error: "server error"});
  }
});

router.get('/:id',authMiddleware,async (req:Request, res:Response)=>{
    const {id} = req.params;
    try{

      if(!id) return res.status(400).json({error: "the id field is empty"})

      const article = await articleDb.findById(Number(id));

      if(!article) return res.status(404).json({error:""});


      return res.status(200).json({
                             message:"article retrived successfully",
                             article: article 
                            })
   
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "the article was not found"});
    }
});



router.patch('/updateArticle/:id_article',authMiddleware,async (req:Request, res:Response)=>{
    const {id_article} = req.params;
    const {name,unit,quantity} = req.body;
    try{

      if(!id_article || !unit  || !name || !quantity) return res.status(400).json({error: "the fields are empty"})


      await articleDb.updateArticle(Number(id_article),name,quantity,unit)

      return res.status(200).json({message:"article unit changed successfully"})
   
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "the article was not found"});
    }
});

router.get('/user/:user_id',authMiddleware,async (req:Request, res:Response)=>{
   const {user_id} = req.params;  
  try{

      if(!user_id) return res.status(400).json({error: "the user_id field is empty"})

      
      const articles = await articleDb.findByUserId(Number(user_id));
      return res.status(200).json({message:"the articles were successfully retrived",
                                    Articles:articles
      })  
   
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "server error"});
    }
});


router.delete('/:id_article',authMiddleware,async (req:Request, res:Response)=>{
  const {id_article}= req.params;

  console.log("id: " + id_article)

  try{
    if(!id_article) return res.status(400).json({ error: "the id field is empty"});


    await articleDb.delete(Number(id_article));
    return res.status(200).json({message : "the article was successfully deleted"})
  }
  catch(e){
      console.log(e);
      return res.status(500).json({ error: "server error"});
  }
});


export default router;
