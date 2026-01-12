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
  /** Quantité de l'article dans l'inventaire */
  addedAt: Date;
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

  /** Date de l''ajout de l'article (lecture seule) */
  readonly addedAt: Date;

  /**
   * Crée une instance d'Inventory.
   *
   * @param userId - Identifiant de l'utilisateur
   * @param articleId - Identifiant de l'article
   * @param quantity - Quantité de l'article
   * @param addedAt - Date d'ajout de l'article
   */
  constructor(userId: number, articleId: number, quantity: number,addedAt:Date) {
    this.user_id = userId;
    this.article_id = articleId;
    this.quantity = quantity;
    this.addedAt  = addedAt;
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
      addedAt: this.addedAt,
    };
  }
}
