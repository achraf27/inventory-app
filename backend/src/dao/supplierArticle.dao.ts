import type { SupplierArticleRow } from "../types/supplierArticleRow.js";
import { DbPostgreSQL } from "../database/dbPostgreSql.js";

/**
 * Data Access Object pour la table `suppliers_articles`.
 * Gère les relations entre fournisseurs et articles.
 */
export class SupplierArticleDao {

  async insertOneArticle(suppliers: SupplierArticleRow): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "INSERT INTO suppliers_articles (supplier_id, article_id) VALUES ($1, $2)",
      [suppliers.supplier_id, suppliers.article_id]
    );
    return result.rowCount!!;
  }

  async insertArticles(supplierId: number, articleIds: number[]): Promise<void> {
    const pool = DbPostgreSQL.getPool();
    for (const articleId of articleIds) {
      await pool.query(
        "INSERT INTO suppliers_articles (supplier_id, article_id) VALUES ($1, $2)",
        [supplierId, articleId]
      );
    }
  }

  async delete(supplierArticle: SupplierArticleRow): Promise<number> {
    if (!supplierArticle.supplier_id || !supplierArticle.article_id) {
      throw new Error("Cannot delete undefined article");
    }
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "DELETE FROM suppliers_articles WHERE supplier_id = $1 AND article_id = $2",
      [supplierArticle.supplier_id, supplierArticle.article_id]
    );
    return result.rowCount!;
  }

  async deleteAllArticlesBySupplier(supplierId: number): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "DELETE FROM suppliers_articles WHERE supplier_id = $1",
      [supplierId]
    );
    return result.rowCount!;
  }

  async findBySupplierId(supplierId: number): Promise<SupplierArticleRow[] | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      `SELECT sa.supplier_id, sa.article_id, s.contact_name, a.name, a.unit
       FROM suppliers_articles sa
       JOIN suppliers s ON sa.supplier_id = s.id
       JOIN articles a ON sa.article_id = a.id
       WHERE sa.supplier_id = $1`,
      [supplierId]
    );
    return result.rows as SupplierArticleRow[];
  }

  async findOneArticle(supplierId: number, articleId: number): Promise<SupplierArticleRow> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      `SELECT sa.supplier_id, sa.article_id, a.name, a.unit
       FROM suppliers_articles sa
       JOIN articles a ON sa.article_id = a.id
       WHERE sa.supplier_id = $1 AND sa.article_id = $2`,
      [supplierId, articleId]
    );
    return result.rows[0] as SupplierArticleRow;
  }

  async findAllSuppliersArticles(): Promise<SupplierArticleRow[] | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      `SELECT sa.supplier_id, sa.article_id, s.contact_name, a.name, a.unit
       FROM suppliers_articles sa
       JOIN suppliers s ON sa.supplier_id = s.id
       JOIN articles a ON sa.article_id = a.id`
    );
    return result.rows as SupplierArticleRow[];
  }
}
