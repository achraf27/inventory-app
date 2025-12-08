import { Router } from 'express';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middlewares/authMiddleware.js';
import type { Request, Response } from "express";
import isAdmin from '../middlewares/isAdminMiddleware.js';
import { userRepository } from '../repositories/userRepository.js';


const userDb = new userRepository();
const router = Router();

router.delete('/delete/:id',authMiddleware,isAdmin, async (req:Request, res:Response) => {
  const {id} = req.params;
  console.log("delete attempt:", id);

  if (!id) {
      return res.status(400).json({ error: "Missing field" });
    }

  try{
    const user = await userDb.getUser(Number(id));
    if(user === undefined) return res.status(401).json({ error: "account not deleted" });


    
    await userDb.deleteUser(Number(id))
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

        const user =  await userDb.getUser(Number(id));
        console.log(req.params);
        if(!user) return res.status(401).json({error:"mail not changed"})


        const changes = await userDb.updateMail(Number(id),newMail);

        if(!changes) return res.status(404).json({message: "could not update the mail"})


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
        
        
        const user =  await userDb.getUser(Number(id)); 
        if(!user) return res.status(401).json({error:"password not changed"})
        const hash = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS!));

        const changes = await userDb.updatePassword(Number(id),hash);

        if(!changes) return res.status(404).json({message: "could not update the password"})

        return res.status(201).json({message:"password changed successuly"})
    }catch(e){
        console.log(e)
        return res.status(500).json({error:"server error"})
    }
})

router.get('/:id',authMiddleware,isAdmin,async (req:Request, res:Response)=>{
    const {id} = req.params;
    try{

      if(!id) return res.status(400).json({error: "the id field is empty"})

      const user =  await userDb.getUser(Number(id));

      if(user === undefined) return res.status(404).json({error:""});


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

router.get('/',authMiddleware,isAdmin,async (req:Request, res:Response)=>{

    try{

      

      const user =  await userDb.getAllUsers();

      if(user === undefined) return res.status(404).json({error:""});


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
