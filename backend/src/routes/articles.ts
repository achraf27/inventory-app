import { Router } from 'express';
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';

const factory = new DAODbFactory;
const router = Router();


router.post('/article', async (req, res) => {

  try{
   
    return res.status(200).json({ message: "article updated"});
  }catch(e){
    console.log(e)
    return res.status(401).json({ error: "article not created"});
  }
});

router.get('/article',(req,res)=>{
  
    try{
   
    }
    catch(e){
        console.log(e);
        return res.status(401).json({ error: "article not found"});
    }
});


router.delete('/article',(req,res)=>{
  
  try{
 
  }
  catch(e){
      console.log(e);
      return res.status(500).json({ error: "article not deleted"});
  }
});


export default router;
