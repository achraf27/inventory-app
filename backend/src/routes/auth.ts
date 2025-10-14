import { Router } from 'express';
import { user } from '../services/user/classes/user.js';
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';
import bcrypt from 'bcryptjs';
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const factory = new DAODbFactory;
const userDb = factory.createUserDAO();
const router = Router();



router.post('/login', async (req:Request, res:Response) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);
  

  try{
    const user = await userDb.findByUsername(username)
    if(!user) return res.status(401).json({ error: "Invalid User" });


    const ok = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET!, { expiresIn: "15d" });
    if(ok) return res.status(200).json({ message: "Login successful", token });

    
  }catch(e){
    console.log(e)
    return res.status(500).json({ error: "server error"});
  }
});

router.post('/register',async (req:Request, res:Response)=>{
    
    const {username,password,mail} = req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
    console.log("creation attempt");
    try{
    const newUser = new user(username,hash,mail)
    await userDb.insert(newUser)
    console.log("user created");
    return res.status(201).json({message: "user created", id:newUser.getId()})
    }
    catch(e){
        console.log(e);
        return res.status(401).json({message: "user not created"})
    }
})




export default router;
