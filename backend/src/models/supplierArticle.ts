/**
 * DTO représentant un article fourni par un fournisseur.
 */
export type SupplierArticleDto = {
  /** Identifiant de l'article */
  article_id: number;
  /** Identifiant du fournisseur */
  supplier_id: number;
  /** Nom du contact du fournisseur */
  readonly contact_name: string;
  /** Nom de l'article */
  name: string;
  /** Unité de mesure de l'article */
  unit: string;
};

/**
 * Classe représentant la relation entre un fournisseur et un article.
 */
export class SupplierArticle {
  /** Identifiant de l'article */
  readonly article_id: number;
  /** Identifiant du fournisseur */
  readonly supplier_id: number;
  /** Nom du contact du fournisseur */
  readonly contact_name: string;
  /** Nom de l'article */
  readonly name: string;
  /** Unité de mesure de l'article */
  readonly unit: string;

  /**
   * Crée une instance de SupplierArticle.
   *
   * @param article_id - Identifiant de l'article
   * @param supplier_id - Identifiant du fournisseur
   * @param contact_name - Nom du contact du fournisseur
   * @param name - Nom de l'article
   * @param unit - Unité de mesure de l'article
   */
  constructor(
    article_id: number,
    supplier_id: number,
    contact_name: string,
    name: string,
    unit: string
  ) {
    this.article_id = article_id;
    this.supplier_id = supplier_id;
    this.contact_name = contact_name;
    this.name = name;
    this.unit = unit;
  }

  /**
   * Transforme l'objet en DTO sérialisable.
   *
   * @returns SupplierArticleDto - Objet contenant article_id, supplier_id, contact_name, name et unit
   */
  toDto(): SupplierArticleDto {
    return {
      article_id: this.article_id,
      supplier_id: this.supplier_id,
      contact_name: this.contact_name,
      name: this.name,
      unit: this.unit,
    };
  }
}
