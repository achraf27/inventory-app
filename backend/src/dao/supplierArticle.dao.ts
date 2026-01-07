import type { SupplierArticleRow } from "../types/supplierArticleRow.js";
import { Db } from "../database/dbSqlite.js";

/**
 * Data Access Object pour la table `suppliers_articles`.
 * Gère les relations entre fournisseurs et articles.
 */
export class SupplierArticleDao {

  /**
   * Insère un seul article pour un fournisseur.
   *
   * @param suppliers Objet contenant supplier_id et article_id
   * @returns Promise<number> Nombre de lignes affectées
   */
  async insertOneArticle(suppliers: SupplierArticleRow): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run(
      "INSERT INTO suppliers_articles (supplier_id, article_id) VALUES (?, ?)",
      suppliers.supplier_id,
      suppliers.article_id
    );
    return result.changes!;
  }

  /**
   * Insère plusieurs articles pour un fournisseur.
   *
   * @param supplierId ID du fournisseur
   * @param articleIds Liste des IDs d'articles
   * @returns Promise<void>
   */
  async insertArticles(supplierId: number, articleIds: number[]): Promise<void> {
    const db = await Db.getConnection();
    for (const articleId of articleIds) {
      await db.run(
        "INSERT INTO suppliers_articles (supplier_id, article_id) VALUES (?, ?)",
        supplierId,
        articleId
      );
    }
  }

  /**
   * Supprime un article spécifique pour un fournisseur.
   *
   * @param supplierArticle Objet contenant supplier_id et article_id
   * @returns Promise<number> Nombre de lignes affectées
   * @throws Error si supplier_id ou article_id est undefined
   */
  async delete(supplierArticle: SupplierArticleRow): Promise<number> {
    if (!supplierArticle.supplier_id || !supplierArticle.article_id) {
      throw new Error("Cannot delete undefined article");
    }
    const db = await Db.getConnection();
    const result = await db.run(
      "DELETE FROM suppliers_articles WHERE supplier_id = ? AND article_id = ?",
      supplierArticle.supplier_id,
      supplierArticle.article_id
    );
    return result.changes!;
  }

  /**
   * Supprime tous les articles associés à un fournisseur.
   *
   * @param supplierId ID du fournisseur
   * @returns Promise<number> Nombre de lignes affectées
   */
  async deleteAllArticlesBySupplier(supplierId: number): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run(
      "DELETE FROM suppliers_articles WHERE supplier_id = ?",
      supplierId
    );
    return result.changes!;
  }

  /**
   * Récupère tous les articles associés à un fournisseur.
   *
   * @param supplierId ID du fournisseur
   * @returns Promise<SupplierArticleRow[] | undefined> Liste des articles
   */
  async findBySupplierId(supplierId: number): Promise<SupplierArticleRow[] | undefined> {
    const db = await Db.getConnection();
    const rows = await db.all(
      `SELECT
          sa.supplier_id,
          sa.article_id,
          s.contact_name,
          a.name,
          a.unit
       FROM suppliers_articles sa
       JOIN suppliers s ON sa.supplier_id = s.id
       JOIN articles a ON sa.article_id = a.id
       WHERE sa.supplier_id = ?`,
      [supplierId]
    );
    return rows as SupplierArticleRow[];
  }

  /**
   * Récupère un article spécifique pour un fournisseur.
   *
   * @param supplierId ID du fournisseur
   * @param articleId ID de l'article
   * @returns Promise<SupplierArticleRow> L'article trouvé
   */
  async findOneArticle(supplierId: number, articleId: number): Promise<SupplierArticleRow> {
    const db = await Db.getConnection();
    const row = await db.get(
      `SELECT
          s.supplier_id,
          s.article_id,
          a.name,
          a.unit
       FROM suppliers_articles s
       JOIN articles a ON s.article_id = a.id
       WHERE s.supplier_id = ? AND s.article_id = ?`,
      [supplierId, articleId]
    );
    return row as SupplierArticleRow;
  }

  /**
   * Récupère tous les articles associés à tous les fournisseurs.
   *
   * @returns Promise<SupplierArticleRow[] | undefined> Liste de tous les articles
   */
  async findAllSuppliersArticles(): Promise<SupplierArticleRow[] | undefined> {
    const db = await Db.getConnection();
    const rows = await db.all(
      `SELECT
          sa.supplier_id,
          sa.article_id,
          s.contact_name,
          a.name,
          a.unit
       FROM suppliers_articles sa
       JOIN suppliers s ON sa.supplier_id = s.id
       JOIN articles a ON sa.article_id = a.id`
    );
    return rows as SupplierArticleRow[];
  }
}
