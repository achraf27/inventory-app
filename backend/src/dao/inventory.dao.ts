import type { InventoryArticleRow, InventoryRow } from "../types/inventoryRow.js";
import { Db } from "../database/dbSqlite.js";

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
    const db = await Db.getConnection();
    const result = await db.run(
      "INSERT INTO inventory (article_id, user_id, quantity) VALUES (?, ?, ?)",
      inventory.article_id,
      inventory.user_id,
      inventory.quantity
    );

    return result.changes!;
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
    const db = await Db.getConnection();
    const result = await db.run(
      "DELETE FROM inventory WHERE article_id = ? AND user_id = ?",
      articleId,
      userId
    );
    return result.changes!;
  }

  /**
   * Récupère tous les articles de l'inventaire d'un utilisateur.
   *
   * @param id ID de l'utilisateur
   * @returns Promise<InventoryArticleRow[] | undefined> Liste des articles avec nom et unité
   */
  async findByUserId(id: number): Promise<InventoryArticleRow[] | undefined> {
    const db = await Db.getConnection();
    const rows = await db.all(`
      SELECT i.user_id, i.article_id, i.quantity, a.name, a.unit
      FROM inventory i
      JOIN articles a ON i.article_id = a.id
      WHERE i.user_id = ?
    `, [id]);
    return rows as InventoryArticleRow[];
  }

  /**
   * Récupère un seul article dans l'inventaire d'un utilisateur.
   *
   * @param userId ID de l'utilisateur
   * @param articleId ID de l'article
   * @returns Promise<InventoryArticleRow | undefined> L'article trouvé ou undefined
   */
  async findOneArticle(userId: number, articleId: number): Promise<InventoryArticleRow | undefined> {
    const db = await Db.getConnection();
    const row = await db.get(`
      SELECT i.user_id, i.article_id, i.quantity, a.name, a.unit
      FROM inventory i
      JOIN articles a ON i.article_id = a.id
      WHERE i.user_id = ? AND i.article_id = ?
    `, [userId, articleId]);
    return row as InventoryArticleRow;
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
    const db = await Db.getConnection();
    const result = await db.run(
      "UPDATE inventory SET quantity = ? WHERE user_id = ? AND article_id = ?",
      quantity,
      userId,
      articleId
    );
    return result.changes!;
  }
}
