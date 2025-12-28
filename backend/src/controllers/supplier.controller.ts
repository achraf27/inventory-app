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
            return res.status(500).json({ message: "server error"});
        }
    }

    delete = async (req:Request, res:Response) => {
      const {supplier_id} = req.params;
      console.log("delete attempt:", supplier_id);
    
    
      try{
        const supplier = await this.supplierRepo.getSupplier(Number(supplier_id));
        if(supplier === undefined) return res.status(404).json({ message: "supplier could not be deleted" });
    
    
        
        await this.supplierRepo.deleteSupplier(Number(supplier_id))
        return res.status(200).json({ message: "account deleted successfuly", supplier: { supplier_id } });
    
        
      }catch(e){
        console.log(e)
        return res.status(500).json({ message: "server error"});
      }
    }
    
    update = async  (req:Request, res:Response)=>{
        const {supplier_id} = req.params;
        const {contact_name,mail,phone,address} = req.body;
        try{
        
          await this.supplierRepo.updateSupplier(Number(supplier_id),{contact_name,mail,phone,address})
    
          return res.status(200).json({message:"supplier updated successfully"})
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error"});
        }
    }

    getSupplier = async (req:Request, res:Response)=>{
        const {supplier_id} = req.params;
        try{
    
    
          const supplier =  await this.supplierRepo.getSupplier(Number(supplier_id));
    
          if(supplier === undefined) return res.status(404).json({message:"supplier not found"});
    
    
          return res.status(200).json({
                                 message:"supplier retrived successfully",
                                 supplier: supplier.toDto()
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error"});
        }
    }

    getAllSuppliers = async (req:Request, res:Response)=>{
    
        try{
    
          
    
          const supplier =  await this.supplierRepo.getAllSuppliers();
    
          if(supplier === undefined) return res.status(404).json({message:"suppliers not found"});
    
    
          return res.status(200).json({
                                 message:"suppliers retrived successfully",
                                 supplier: supplier 
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error"});
        }
    }


     addSupplierArticle = async (req:Request, res:Response)=>{
      const {supplier_id,article_id} = req.params;
        try{
          const result =  await this.supplierRepo.addArticle(Number(supplier_id),Number(article_id));
    
          if(!result) return res.status(404).json({message:"article could not be added"});
    
    
          return res.status(200).json({
                                 message:"article added successfully",
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error"});
        }
    }

     removeSupplierArticle = async (req:Request, res:Response)=>{
      const {supplier_id,article_id} = req.params;
        try{
    
          const result =  await this.supplierRepo.removeSupplierArticle(Number(supplier_id),Number(article_id));
    
          if(!result) return res.status(404).json({message:"article could not be removed"});
    
    
          return res.status(200).json({
                                 message:"article removed successfully",
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error"});
        }
    }

    getAllSuppliersArticles = async (req:Request, res:Response)=>{
        try{


          const articles =  await this.supplierRepo.getAllSupplierArticles();
    
          if(articles === undefined) return res.status(404).json({message:"articles not found"});
    
    
          return res.status(200).json({
                                 message:"supplier retrived successfully",
                                 articles: articles 
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error: supplier's articles were not found"});
        }
    }

    getAllArticlesBySupplier = async (req:Request, res:Response)=>{
      const {supplier_id} = req.params;
        try{


          const articles =  await this.supplierRepo.getAllArticlesBySupplierId(Number(supplier_id));
    
          if(articles === undefined) return res.status(404).json({message:"articles not found"});
    
    
          return res.status(200).json({
                                 message:"supplier retrived successfully",
                                 articles: articles 
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error: supplier's articles were not found"});
        }
    }


    getOneSupplierArticle = async (req:Request, res:Response)=>{
      const {supplier_id,article_id} = req.params;
        try{

          if(isNaN(Number(supplier_id)) || isNaN(Number(article_id))) return res.status(400).json({message:"the given fields are not numbers"})

          const supplier =  await this.supplierRepo.getOneSupplierArticle(Number(supplier_id),Number(article_id));
    
          if(supplier === undefined) return res.status(404).json({message:"article not found"});
    
    
          return res.status(200).json({
                                 message:"article retrived successfully",
                                 supplier: supplier 
                                })
       
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "server error: the article was not found"});
        }
    }


    
}





export const supplierController = new SupplierController();
