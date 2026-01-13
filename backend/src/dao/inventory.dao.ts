import type { InventoryArticleRow, InventoryRow } from "../types/inventoryRow.js";
import { DbPostgreSQL } from "../database/dbPostgreSql.js";

/**
 * Data Access Object pour l'inventaire.
 * Contient toutes les opérations CRUD sur la table `inventory`.
 */
export class InventoryDao {

  /**
   * Insère un article dans l'inventaire pour un utilisateur donné.
   *
   * @param inventory Objet InventoryRow contenant { article_id, user_id, quantity }
   * @returns Promise<number> Nombre de lignes insérées (normalement 1)
   */
  async insert(inventory: InventoryRow): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "INSERT INTO inventory (article_id, user_id, quantity) VALUES ($1, $2, $3)",
      [inventory.article_id, inventory.user_id, inventory.quantity]
    );
    return result.rowCount!;
  }

  /**
   * Supprime un article de l'inventaire pour un utilisateur donné.
   *
   * @param userId ID de l'utilisateur
   * @param articleId ID de l'article
   * @returns Promise<number> Nombre de lignes supprimées
   * @throws Error si userId ou articleId est undefined
   */
  async delete(userId: number, articleId: number): Promise<number> {
    if (userId === undefined || articleId === undefined) {
      throw new Error("Cannot delete undefined inventory");
    }
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "DELETE FROM inventory WHERE article_id = $1 AND user_id = $2",
      [articleId, userId]
    );
    return result.rowCount!;
  }

  /**
   * Récupère tous les articles de l'inventaire d'un utilisateur.
   *
   * @param id ID de l'utilisateur
   * @returns Promise<InventoryArticleRow[] | undefined> Liste des articles avec nom et unité
   */
  async findByUserId(id: number): Promise<InventoryArticleRow[] | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      `SELECT i.user_id, i.article_id, i.quantity, a.name, a.unit, i.added_at
       FROM inventory i
       JOIN articles a ON i.article_id = a.id
       WHERE i.user_id = $1`,
      [id]
    );
    return result.rows as InventoryArticleRow[];
  }

  /**
   * Récupère un seul article dans l'inventaire d'un utilisateur.
   *
   * @param userId ID de l'utilisateur
   * @param articleId ID de l'article
   * @returns Promise<InventoryArticleRow | undefined> L'article trouvé ou undefined
   */
  async findOneArticle(userId: number, articleId: number): Promise<InventoryArticleRow | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      `SELECT i.user_id, i.article_id, i.quantity, a.name, a.unit, i.added_at
       FROM inventory i
       JOIN articles a ON i.article_id = a.id
       WHERE i.user_id = $1 AND i.article_id = $2`,
      [userId, articleId]
    );
    return result.rows[0] as InventoryArticleRow;
  }

  /**
   * Met à jour la quantité d'un article pour un utilisateur donné.
   *
   * @param userId ID de l'utilisateur
   * @param articleId ID de l'article
   * @param quantity Nouvelle quantité
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updateQuantity(userId: number, articleId: number, quantity: number): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "UPDATE inventory SET quantity = $1 WHERE user_id = $2 AND article_id = $3",
      [quantity, userId, articleId]
    );
    return result.rowCount!;
  }
}
