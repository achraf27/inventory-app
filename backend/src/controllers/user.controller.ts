import type { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from 'bcryptjs';



export class UserController{

    private userRepo = new UserRepository();


    createUser = async (req:Request, res:Response)=>{
            
            const {role,name,password,mail} = req.body;
            const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
            try{
              
              const user = await this.userRepo.createUser({role,name,mail,passwordHash:hash});
          
              return res.status(201).json({
                message: "user created",
                user
              });
          }
            catch(e){
                console.log(e);
                return res.status(500).json({message: "server error"})
            }
        }


    delete = async (req:Request, res:Response) => {
      const {user_id} = req.params;
      console.log("delete attempt:", user_id);
    
    
      try{
        const user = await this.userRepo.getUser(Number(user_id));
        if(user === undefined) return res.status(404).json({ message: "user not found" });
    
    
        
        await this.userRepo.deleteUser(Number(user_id))
        return res.status(200).json({ message: "account deleted successfuly", user: { user_id } });
    
        
      }catch(e){
        console.log(e)
        return res.status(500).json({ message: "server error"});
      }
    }

    updateMail = async (req:Request, res:Response)=>{
        const{newMail} = req.body;
        const user_id = (req as any).user.id;
    
        try{
    
            const user =  await this.userRepo.getUser(Number(user_id));
            console.log(req.params);
            if(!user) return res.status(404).json({message:"user not found"})
    
    
            const changes = await this.userRepo.updateMail(Number(user_id),newMail);
    
            if(!changes) return res.status(404).json({message: "could not update the mail"})
    
    
            return res.status(200).json({message:"mail changed successuly"})
        }catch(e){
            console.log(e)
            return res.status(500).json({message:"server error"})
        }
    }

    updatePassword = async (req:Request, res:Response)=>{
        const{newPassword} = req.body;
        const user_id = (req as any).user.id;

        try{
            
            
            const user =  await this.userRepo.getUser(Number(user_id)); 
            if(!user) return res.status(404).json({message:"user not found"})
            const hash = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS!));

            const changes = await this.userRepo.updatePassword(Number(user_id),hash);

            if(!changes) return res.status(404).json({message: "could not update the password"})

            return res.status(200).json({message:"password changed successuly"})
        }catch(e){
            console.log(e)
            return res.status(500).json({message:"server error"})
        }
        
    }

    getUser = async (req:Request, res:Response)=>{
        const {user_id} = req.params;
        try{
    
    
          const user =  await this.userRepo.getUser(Number(user_id));
    
          if(user === undefined) return res.status(404).json({message:"user not found"});
    
    
          return res.status(200).json({
                                 message:"user retrived successfully",
                                 user: user.toDto()
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "user was not found"});
        }
    }

    getAllUsers = async (req:Request, res:Response)=>{
    
        try{
    
          
    
          const users =  await this.userRepo.getAllUsers();
    
          if(users === undefined) return res.status(404).json({message:"users not found"});
    
    
          return res.status(200).json({
                                 message:"user retrived successfully",
                                 users: users 
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "user was not found"});
        }
    }
    
     adminUpdateRole = async (req:Request, res:Response)=>{
        const{newRole} = req.body;
        const{user_id} = req.params;
    
        try{
    
            const user =  await this.userRepo.getUser(Number(user_id));
            console.log(req.params);
            if(!user) return res.status(404).json({message:"user not found"})
    
    
            const changes = await this.userRepo.updateRole(Number(user_id),newRole);
    
            if(!changes) return res.status(404).json({message: "could not update the role"})
    
    
            return res.status(200).json({message:"mail changed successuly"})
        }catch(e){
            console.log(e)
            return res.status(500).json({message:"server error"})
        }
    }

         adminUpdateName = async (req:Request, res:Response)=>{
        const{newName} = req.body;
        const{user_id} = req.params;
    
        try{
    
            const user =  await this.userRepo.getUser(Number(user_id));
            console.log(req.params);
            if(!user) return res.status(404).json({message:"user not found"})
    
    
            const changes = await this.userRepo.updateMail(Number(user_id),newName);
    
            if(!changes) return res.status(404).json({message: "could not update the name"})
    
    
            return res.status(200).json({message:"name changed successuly"})
        }catch(e){
            console.log(e)
            return res.status(500).json({message:"server error"})
        }
    }

     adminUpdateMail = async (req:Request, res:Response)=>{
        const{newMail} = req.body;
        const{user_id} = req.params;
    
        try{
    
            const user =  await this.userRepo.getUser(Number(user_id));
            console.log(req.params);
            if(!user) return res.status(404).json({error:"user not found"})
    
    
            const changes = await this.userRepo.updateMail(Number(user_id),newMail);
    
            if(!changes) return res.status(404).json({message: "could not update the mail"})
    
    
            return res.status(200).json({message:"mail changed successuly"})
        }catch(e){
            console.log(e)
            return res.status(500).json({message:"server error"})
        }
    }

    adminUpdatePassword = async (req:Request, res:Response)=>{
        const{newPassword} = req.body;
        const{user_id} = req.params

        try{
            
            
            const user =  await this.userRepo.getUser(Number(user_id)); 
            if(!user) return res.status(404).json({error:"user not found"})
            const hash = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS!));

            const changes = await this.userRepo.updatePassword(Number(user_id),hash);

            if(!changes) return res.status(404).json({message: "could not update the password"})

            return res.status(200).json({message:"password changed successuly"})
        }catch(e){
            console.log(e)
            return res.status(500).json({message:"server error"})
        }
        
    }
    
}





export const userController = new UserController();
