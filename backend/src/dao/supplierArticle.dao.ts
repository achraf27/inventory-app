import type { SupplierArticleRow } from "../types/supplierArticleRow.js";
import { Db } from "../database/dbSqlite.js";


export class SupplierArticleDao{

    async insert(suppliers: SupplierArticleRow):Promise<number>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO suppliers_articles (supplier_id,article_id) VALUES (?,?)",
        suppliers.supplier_id,
        suppliers.article_id,
    );      
   

      return result.changes!;
      
  }

    async delete(supplierArticle: SupplierArticleRow):Promise<number>{
        if (!supplierArticle.supplier_id || !supplierArticle.article_id) {
            throw new Error('Cannot delete undefined article');
          }
        const db = await Db.getConnection();
        const result = await db.run("DELETE FROM suppliers_articles WHERE supplier_id = ? AND article_id = ?", supplierArticle.supplier_id,supplierArticle.article_id);
        return result.changes!;

    }

    async findBySupplierId(supplierId:number): Promise<SupplierArticleRow[] | undefined> {
        const db = await Db.getConnection();
        const rows = await db.all(`
                      SELECT s.supplier_id, s.article_id, a.name, a.unit
                      FROM suppliers_articles s
                      JOIN articles a ON s.article_id = a.id
                      WHERE s.supplier_id = ?
                  `, [supplierId]);
                return rows as SupplierArticleRow[];
    }

    async findOneArticle(supplierId:number,articleId:number): Promise<SupplierArticleRow> {
            const db = await Db.getConnection();
              const row = await db.get(`
                      SELECT s.supplier_id, s.article_id, a.name, a.unit
                      FROM suppliers_articles s
                      JOIN articles a ON s.article_id = a.id
                      WHERE s.supplier_id = ? AND s.article_id = ?
                  `, [supplierId,articleId]);
                return row as SupplierArticleRow;
        }
    
}