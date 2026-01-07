import type { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const DEFAULT_ROLE = "User";



export class AuthController{

    private authRepo = new UserRepository();



    login = async (req:Request, res:Response) => {
      const { name, password } = req.body;    
      try{
        const user = await this.authRepo.getUser(name)
        console.log(user);
        if(!user) return res.status(401).json({ message: "Invalid User" });
    
        const ok = await user.verifyPassword(password);
    
        const token = jwt.sign(
          { id: user.id, role:user.role, name },
          process.env.JWT_SECRET!,
          { expiresIn: "20d" }
        );
    
        if(ok) return res.status(200).json({ message: "Login successful", token,user: user.toDto() });

        else return res.status(401).json({message:"Login failed"});
    
        
      }catch(e){
        console.log(e)
        return res.status(500).json({ message: "Server error."});
      }
    }

    register = async (req:Request, res:Response)=>{
        
        const {name,password,mail} = req.body;
        const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
        console.log("creation attempt name: "+name);
        try{
          
          const user = await this.authRepo.createUser({role:DEFAULT_ROLE,name,mail,passwordHash:hash});
      
          const token = jwt.sign(
            { id: user.id, role:user.role, name },
            process.env.JWT_SECRET!,
            { expiresIn: "20d" }
          );
      
          return res.status(201).json({
            message: "user created",
            token,
            user: user.toDto()
          });
      }
        catch(e){
            console.log(e);
            return res.status(500).json({message: "server error"})
        }
    }
}

export const authController = new AuthController();