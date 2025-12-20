import { Supplier } from "../models/supplier.js";
import { SupplierArticle } from "../models/SupplierArticle.js";
import { SupplierDao } from "../dao/supplier.dao.js";
import { SupplierArticleDao } from "../dao/supplierArticle.dao.js";
import type { SupplierRow } from "../types/supplierRow.js";
import type { SupplierArticleRow } from "../types/supplierArticleRow.js";

type CreateSupplierInput = {
  contact_name: string;
  mail: string;
  phone:string;
  address:string;
};

export class SupplierRepository{
    private supplierDao: SupplierDao;
    private supplierArticleDao:SupplierArticleDao;


    constructor(supplierDao = new SupplierDao(),supplierArticleDao = new SupplierArticleDao()) {
        this.supplierDao = supplierDao;
        this.supplierArticleDao = supplierArticleDao;
    }

    
    
        private mapRowToSupplier(row:SupplierRow):Supplier{
            return new Supplier(row.contact_name,row.mail,row.phone,row.address,row.id);
        }

        private mapRowToSupplierArticle(row:SupplierArticleRow):SupplierArticle{
            return new SupplierArticle(row.article_id,row.supplier_id,row.name ?? "Unknown",row.unit ?? "Unknown");
        }
    
        public async getSupplier(supplier_id:number):Promise<Supplier|undefined>{
            const row = await this.supplierDao.findById(supplier_id);
            return row? this.mapRowToSupplier(row) : undefined;
        }

         public async getAllSuppliers():Promise<Supplier[] | undefined>{
                const rows = await this.supplierDao.findAll();
                return  rows.map(row => this.mapRowToSupplier(row));
            }
        
    
    
        public async createSupplier(_supplier:CreateSupplierInput):Promise<Supplier>{

            const newSupplier = new Supplier(_supplier.contact_name,_supplier.mail,_supplier.phone,_supplier.address);
            const id = await this.supplierDao.insert(_supplier);
            newSupplier.id = id;
            return newSupplier;
        }
    
        public async deleteSupplier(id:number): Promise<boolean>{
            const result = await this.supplierDao.delete(id);
            return result > 0;
        }
    

        public async updateSupplier(id:number,_supplier:Partial<SupplierRow>):Promise<boolean>{
            let totalChanges = 0;

            if(_supplier.contact_name !== undefined) totalChanges += await this.supplierDao.updateName(id,_supplier.contact_name);

            if(_supplier.mail !== undefined) totalChanges += await this.supplierDao.updateMail(id,_supplier.mail);

            if(_supplier.phone !== undefined) totalChanges += await this.supplierDao.updatePhone(id,_supplier.phone);

            if(_supplier.address !== undefined) totalChanges += await this.supplierDao.updateAddress(id,_supplier.address);

            return totalChanges > 0;
        }

        public async addArticle(supplier_id:number,article_id:number):Promise<boolean>{
            const result = await this.supplierArticleDao.insert({supplier_id,article_id});
            return result>0;
        }

        public async removeSupplierArticle(supplier_id:number,article_id:number):Promise<boolean>{
            const result = await this.supplierArticleDao.delete({supplier_id,article_id})
            return result >  0;
        }

        public async getAllSupplierArticles(supplierId:number):Promise<SupplierArticle[]|undefined>{
            const rows = await this.supplierArticleDao.findBySupplierId(supplierId);
            return  rows ? rows.map(row => this.mapRowToSupplierArticle(row)):undefined;
        }

        public async getOneSupplierArticle(supplierId:number,articleId:number):Promise<SupplierArticle|undefined>{
            const row = await this.supplierArticleDao.findOneArticle(supplierId,articleId);
            return  row ? this.mapRowToSupplierArticle(row):undefined;
        }
    
    
}
