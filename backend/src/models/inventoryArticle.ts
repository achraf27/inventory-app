/**
 * DTO représentant un article dans l'inventaire d'un utilisateur,
 * incluant le nom et l'unité de l'article.
 */
export type InventoryArticleDto = {
  /** Identifiant de l'utilisateur */
  userId: number;
  /** Identifiant de l'article */
  articleId: number;
  /** Nom de l'article */
  name: string;
  /** Quantité de l'article dans l'inventaire */
  quantity: number;
  /** Unité de mesure de l'article */
  unit: string;
  /** Quantité de l'article dans l'inventaire */
  addedAt?: Date|undefined;
};

/**
 * Classe représentant un article dans l'inventaire d'un utilisateur
 * avec informations détaillées sur l'article.
 */
export class InventoryArticle {
  /** Identifiant de l'utilisateur (lecture seule) */
  readonly user_id: number;

  /** Identifiant de l'article (lecture seule) */
  readonly article_id: number;

  /** Nom de l'article (lecture seule) */
  readonly name: string;

  /** Quantité de l'article (lecture seule) */
  readonly quantity: number;

  /** Unité de l'article (lecture seule) */
  readonly unit: string;

  /** Unité de l'article (lecture seule) */
  readonly addedAt?: Date;

  /**
   * Crée une instance d'InventoryArticle.
   *
   * @param userId - Identifiant de l'utilisateur
   * @param articleId - Identifiant de l'article
   * @param name - Nom de l'article
   * @param quantity - Quantité de l'article
   * @param unit - Unité de mesure de l'article
   * @param addedAt - Date d'ajout de l'article
   */
  constructor(userId: number, articleId: number, name: string, quantity: number, unit: string,addedAt?: Date) {
    this.user_id = userId;
    this.article_id = articleId;
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    if(addedAt)
    this.addedAt = addedAt ?? new Date();
  }

  /**
   * Transforme l'article d'inventaire en DTO sérialisable.
   *
   * @returns InventoryArticleDto - Objet contenant userId, articleId, name, quantity et unit
   */
  toDto(): InventoryArticleDto {
    return {
      userId: this.user_id,
      articleId: this.article_id,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      addedAt:this.addedAt
    };
  }
}
