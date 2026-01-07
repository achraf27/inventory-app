/**
 * DTO représentant un article dans l'inventaire d'un utilisateur.
 */
export type InventoryDto = {
  /** Identifiant de l'utilisateur */
  userId: number;
  /** Identifiant de l'article */
  articleId: number;
  /** Quantité de l'article dans l'inventaire */
  quantity: number;
};

/**
 * Classe représentant un article dans l'inventaire d'un utilisateur.
 *
 * Contient l'identifiant de l'utilisateur, de l'article et la quantité.
 */
export class Inventory {
  /** Identifiant de l'utilisateur (lecture seule) */
  readonly user_id: number;

  /** Identifiant de l'article (lecture seule) */
  readonly article_id: number;

  /** Quantité de l'article (lecture seule) */
  readonly quantity: number;

  /**
   * Crée une instance d'Inventory.
   *
   * @param userId - Identifiant de l'utilisateur
   * @param articleId - Identifiant de l'article
   * @param quantity - Quantité de l'article
   */
  constructor(userId: number, articleId: number, quantity: number) {
    this.user_id = userId;
    this.article_id = articleId;
    this.quantity = quantity;
  }

  /**
   * Transforme l'article d'inventaire en DTO sérialisable.
   *
   * @returns InventoryDto - Objet contenant userId, articleId et quantity
   */
  toDto(): InventoryDto {
    return {
      userId: this.user_id,
      articleId: this.article_id,
      quantity: this.quantity,
    };
  }
}
