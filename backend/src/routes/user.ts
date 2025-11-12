import { Router } from 'express';
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middlewares/authMiddleware.js';
import type { Request, Response } from "express";


const factory = new DAODbFactory;
const userDb = factory.createUserDAO();
const router = Router();

router.delete('/delete/:id',authMiddleware, async (req:Request, res:Response) => {
  const {id} = req.params;
  console.log("delete attempt:", id);

  if (!id) {
      return res.status(400).json({ error: "Missing field" });
    }

  try{
    const user = await userDb.findById(Number(id))
    if(!user) return res.status(401).json({ error: "account not deleted" });


    
    await userDb.delete(Number(id))
    return res.status(200).json({ message: "account deleted successfuly", user: { id } });

    
  }catch(e){
    console.log(e)
    return res.status(500).json({ error: "server error"});
  }
});

router.post('/updateMail/:id',authMiddleware,async (req:Request, res:Response)=>{
    const{newMail} = req.body;
    const{id} = req.params;
    if (!id || !newMail) {
      return res.status(400).json({ error: "Missing fields" });
    }


    try{

        const user = await userDb.findById(Number(id))
        if(!user) return res.status(401).json({error:"mail not changed"})


        const changes = await userDb.updateMail(id,newMail);

        if(changes === 0 ) return res.status(404).json({message: "could not update the mail"})


        return res.status(201).json({message:"mail changed successuly"})
    }catch(e){
        console.log(e)
        return res.status(500).json({error:"server error"})
    }
})


router.post('/updatePassword/:id',authMiddleware,async (req:Request, res:Response)=>{
    const{newPassword} = req.body;
    const{id} = req.params
    if (!id || !newPassword) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try{
        
        const user = await userDb.findById(Number(id))
        
        if(!user) return res.status(401).json({error:"password not changed"})
        const hash = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS!));

        const changes = await userDb.updatePassword(id,hash);

        if(changes === 0 ) return res.status(404).json({message: "could not update the password"})

        return res.status(201).json({message:"password changed successuly"})
    }catch(e){
        console.log(e)
        return res.status(500).json({error:"server error"})
    }
})

router.get('/:id',async (req:Request, res:Response)=>{
    const {id} = req.params;
    try{

      if(!id) return res.status(400).json({error: "the id field is empty"})

      const user = await userDb.findById(Number(id));

      if(!user) return res.status(404).json({error:""});


      return res.status(200).json({
                             message:"user retrived successfully",
                             user: user 
                            })
   
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "user was not found"});
    }
});



export default router;
