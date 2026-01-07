/**
 * DTO représentant un article.
 */
export type ArticleDto = {
  /** Identifiant unique de l'article */
  id: number;
  /** Nom de l'article */
  name: string;
  /** Unité de mesure de l'article (ex: Kg, L, pièce) */
  unit: string;
};

/**
 * Classe représentant un article dans le système.
 *
 * Fournit un constructeur pour créer un article et une méthode
 * `toDto` pour obtenir une version sérialisable de l'article.
 */
export class Article {
  /** Identifiant unique de l'article, -1 par défaut si non fourni */
  id: number = -1;

  /** Nom de l'article (lecture seule) */
  readonly name: string;

  /** Unité de mesure de l'article (lecture seule) */
  readonly unit: string;

  /**
   * Crée une instance d'Article.
   *
   * @param name - Nom de l'article
   * @param unit - Unité de mesure de l'article
   * @param id - Optionnel, identifiant de l'article
   */
  constructor(name: string, unit: string, id?: number) {
    this.name = name;
    this.unit = unit;
    if (id !== undefined) this.id = id;
  }

  /**
   * Transforme l'article en DTO sérialisable.
   *
   * @returns ArticleDto - Objet contenant id, name et unit
   */
  toDto(): ArticleDto {
    return {
      id: this.id,
      name: this.name,
      unit: this.unit,
    };
  }
}
