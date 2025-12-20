import type { Request, Response } from "express";
import { SupplierRepository } from "../repositories/supplier.repository.js";

export class SupplierController{

    private supplierRepo = new SupplierRepository();



    create = async (req: Request, res: Response) =>{
        const { contact_name,mail,phone,address } = req.body;
        try{

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


     addSupplierArticle = async (req:Request, res:Response)=>{
      const {supplier_id,article_id} = req.params;
        try{
          const result =  await this.supplierRepo.addArticle(Number(supplier_id),Number(article_id));
    
          if(!result) return res.status(404).json({error:"article could not be added"});
    
    
          return res.status(200).json({
                                 message:"article added successfully",
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ error: "server error"});
        }
    }

     removeSupplierArticle = async (req:Request, res:Response)=>{
      const {supplier_id,article_id} = req.params;
        try{
    
          const result =  await this.supplierRepo.removeSupplierArticle(Number(supplier_id),Number(article_id));
    
          if(!result) return res.status(404).json({error:"article could not be removed"});
    
    
          return res.status(200).json({
                                 message:"article removed successfully",
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ error: "server error"});
        }
    }

    getAllSupplierArticles = async (req:Request, res:Response)=>{
      const {supplier_id} = req.params;
        try{


          const supplier =  await this.supplierRepo.getAllSupplierArticles(Number(supplier_id));
    
          if(supplier === undefined) return res.status(404).json({error:"articles not found"});
    
    
          return res.status(200).json({
                                 message:"supplier retrived successfully",
                                 supplier: supplier 
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ error: "server error: supplier's articles were not found"});
        }
    }


    getOneSupplierArticle = async (req:Request, res:Response)=>{
      const {supplier_id,article_id} = req.params;
        try{

          if(isNaN(Number(supplier_id)) || isNaN(Number(article_id))) return res.status(400).json({error:"the given fields are not numbers"})

          const supplier =  await this.supplierRepo.getOneSupplierArticle(Number(supplier_id),Number(article_id));
    
          if(supplier === undefined) return res.status(404).json({error:"article not found"});
    
    
          return res.status(200).json({
                                 message:"article retrived successfully",
                                 supplier: supplier 
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ error: "server error: the article was not found"});
        }
    }


    
}





export const supplierController = new SupplierController();
