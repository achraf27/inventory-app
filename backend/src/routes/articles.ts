import { Router } from 'express';
import type { Request, Response } from "express";
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';
import { article } from '../services/articles/classes/article.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
const factory = new DAODbFactory;
const articleDb = factory.createArticleDAO();

router.post('/',authMiddleware, async (req:Request, res:Response) => {
  const { name, quantity } = req.body;

  

  try{

    if(!name || !quantity) return res.status(400).json({ error: "the fields are empty"});


    const Article:article = new article(name,quantity);
    await articleDb.insert(Article)
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


router.post('/updateName/:id',authMiddleware,async (req:Request, res:Response)=>{
    const {id} = req.params;
    const {name} = req.body;

    console.log("id: "+ id);
    try{

      if(!id || !name) return res.status(400).json({error: "the fields are empty"})


      const changes = await articleDb.updateName(id,name)

      if(changes === 0) return res.status(404).json({error: "Article not found"})

      return res.status(200).json({message:"article retrived successfully"})
   
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "the article was not found"});
    }
});


router.post('/updateQuantity/:id',authMiddleware,async (req:Request, res:Response)=>{
    const {id} = req.params;
    const {quantity} = req.body;
    try{

      if(!id || !quantity) return res.status(400).json({error: "the fields are empty"})


      await articleDb.updateQuantity(id,quantity)

      return res.status(200).json({message:"article quantity changed successfully"})
   
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "the article was not found"});
    }
});

router.get('/',authMiddleware,async (req:Request, res:Response)=>{
    try{

      const articles = await articleDb.findAll();
      return res.status(200).json({message:"the articles were successfully retrived",
                                    articles:articles
      })  
   
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "server error"});
    }
});


router.delete('/:id',authMiddleware,async (req:Request, res:Response)=>{
  const {id}= req.params;

  console.log("id: " + id)

  try{
    if(!id || Number(id) < 0) return res.status(400).json({ error: "the id field is empty"});


    await articleDb.delete(Number(id));
    return res.status(200).json({message : "the article was successfully deleted"})
  }
  catch(e){
      console.log(e);
      return res.status(500).json({ error: "server error"});
  }
});


export default router;
