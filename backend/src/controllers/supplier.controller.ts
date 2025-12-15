import type { Request, Response } from "express";
import { supplierRepository } from "../repositories/supplier.repository.js";

export class SupplierController{

    private supplierRepo = new supplierRepository();



    create = async (req: Request, res: Response) =>{
        const { contact_name,mail,phone,address } = req.body;
        try{
        if (!contact_name || !mail || !phone || !address) return res.status(400).json({ error: "missing fields" });

        const supplier = await this.supplierRepo.createSupplier({contact_name, mail,phone, address });
        return res.status(200).json(supplier.toDto());
        }
        catch(e){
            return res.status(500).json({ error: "server error"});
        }
    }

    delete = async (req:Request, res:Response) => {
      const {id} = req.params;
      console.log("delete attempt:", id);
    
      if (!id) {
          return res.status(400).json({ error: "Missing field" });
        }
    
      try{
        const supplier = await this.supplierRepo.getSupplier(Number(id));
        if(supplier === undefined) return res.status(404).json({ error: "supplier not found" });
    
    
        
        await this.supplierRepo.deleteSupplier(Number(id))
        return res.status(200).json({ message: "account deleted successfuly", supplier: { id } });
    
        
      }catch(e){
        console.log(e)
        return res.status(500).json({ error: "server error"});
      }
    }
    
    update = async  (req:Request, res:Response)=>{
        const {id} = req.params;
        const {contact_name,mail,phone,address} = req.body;
        try{
    
          if(!id ||(!contact_name && !mail && !phone && !address)) return res.status(400).json({error: "the fields are empty"})
   
          await this.supplierRepo.updateSupplier(Number(id),{contact_name,mail,phone,address})
    
          return res.status(200).json({message:"supplier changed successfully"})
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ error: "the supplier was not found"});
        }
    }

    getSupplier = async (req:Request, res:Response)=>{
        const {id} = req.params;
        try{
    
          if(!id) return res.status(400).json({error: "the id field is empty"})
    
          const supplier =  await this.supplierRepo.getSupplier(Number(id));
    
          if(supplier === undefined) return res.status(404).json({error:"supplier not found"});
    
    
          return res.status(200).json({
                                 message:"supplier retrived successfully",
                                 supplier: supplier.toDto()
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ error: "supplier was not found"});
        }
    }

    getAllSuppliers = async (req:Request, res:Response)=>{
    
        try{
    
          
    
          const supplier =  await this.supplierRepo.getAllSuppliers();
    
          if(supplier === undefined) return res.status(404).json({error:"users not found"});
    
    
          return res.status(200).json({
                                 message:"supplier retrived successfully",
                                 supplier: supplier 
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ error: "supplier was not found"});
        }
    }

    
}





export const supplierController = new SupplierController();
