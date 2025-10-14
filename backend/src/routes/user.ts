import { Router } from 'express';
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middlewares/authMiiddlewares.js';
import type { Request, Response } from "express";


const factory = new DAODbFactory;
const userDb = factory.createUserDAO();
const router = Router();

router.delete('/delete',authMiddleware, async (req:Request, res:Response) => {
  const {id} = req.body;
  console.log("delete attempt:", id);

  if (!id) {
      return res.status(400).json({ error: "Missing field" });
    }

  try{
    const user = await userDb.findById(id)
    if(!user) return res.status(401).json({ error: "account not deleted" });


    
    userDb.delete(id)
    return res.status(200).json({ message: "account deleted successfuly", user: { id } });

    
  }catch(e){
    console.log(e)
    return res.status(500).json({ error: "server error"});
  }
});

router.post('/modifyMail',authMiddleware,async (req:Request, res:Response)=>{
    const{id,newMail} = req.body;
    if (!id || !newMail) {
      return res.status(400).json({ error: "Missing fields" });
    }


    try{

        const user = await userDb.findById(id)
        if(!user) return res.status(401).json({error:"mail not changed"})
        await userDb.updateMail(id,newMail);
        return res.status(201).json({message:"mail changed successuly"})
    }catch(e){
        console.log(e)
        return res.status(500).json({error:"server error"})
    }
})


router.post('/modifyPassword',authMiddleware,async (req:Request, res:Response)=>{
    const{id,newPassword} = req.body;
    if (!id || !newPassword) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try{
        
        const user = await userDb.findById(id)
        
        if(!user) return res.status(401).json({error:"password not changed"})
        const hash = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS!));
        await userDb.updatePassword(id,hash);
        return res.status(201).json({message:"password changed successuly"})
    }catch(e){
        console.log(e)
        return res.status(500).json({error:"server error"})
    }
})

export default router;
