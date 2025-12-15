import { Supplier } from "../models/supplier.js";
import { SupplierDao } from "../dao/supplier.dao.js";
import type { SupplierRow } from "../types/supplierRow.js";

type CreateSupplierInput = {
  contact_name: string;
  mail: string;
  phone:string;
  address:string;
};

export class supplierRepository{
    private supplierDao: SupplierDao = new SupplierDao();
    
    
    private mapRowToArticle(row:SupplierRow):Supplier{
            return new Supplier(row.contact_name,row.mail,row.phone,row.address,row.id);
        }
    
        public async getSupplier(article_id:number):Promise<Supplier|undefined>{
            const row = await this.supplierDao.findById(article_id);
            return row? this.mapRowToArticle(row) : undefined;
        }

         public async getAllSuppliers():Promise<Supplier[] | undefined>{
                const rows = await this.supplierDao.findAll();
                return  rows.map(row => new Supplier(
                row.contact_name,
                row.mail,
                row.phone,
                row.address,
                row.id 
            ));
            }
        
    
    
        public async createSupplier(_supplier:CreateSupplierInput):Promise<Supplier>{

            const newSupplier = new Supplier(_supplier.contact_name,_supplier.mail,_supplier.phone,_supplier.address);
            const id = await this.supplierDao.insert(newSupplier);
            newSupplier.id = id;
            return newSupplier;
        }
    
        public async deleteSupplier(id:number): Promise<boolean>{
            const changes = await this.supplierDao.delete(id);
            return changes > 0;
        }
    

        public async updateSupplier(id:number,_supplier:Partial<SupplierRow>):Promise<boolean>{
            let totalChanges = 0;

            if(_supplier.contact_name !== undefined) totalChanges += await this.supplierDao.updateName(id,_supplier.contact_name);

            if(_supplier.mail !== undefined) totalChanges += await this.supplierDao.updateMail(id,_supplier.mail);

            if(_supplier.phone !== undefined) totalChanges += await this.supplierDao.updateMail(id,_supplier.phone);

            if(_supplier.address !== undefined) totalChanges += await this.supplierDao.updateMail(id,_supplier.address);

            return totalChanges > 0;
        }
    
    
}
