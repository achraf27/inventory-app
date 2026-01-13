import type { ArticleRow } from "../types/articleRow.js";
import { DbPostgreSQL } from "../database/dbPostgreSql.js";

/**
 * Data Access Object pour les articles.
 * Contient toutes les opérations CRUD sur la table `articles`.
 */
export class ArticleDao {

  /**
   * Insère un nouvel article en base.
   *
   * @param article Objet article sans l'ID ({ name, unit })
   * @returns Promise<number> ID de l'article créé
   * @throws Error si l'insertion échoue
   */
  async insert(article: Omit<ArticleRow, "id">): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "INSERT INTO articles (name, unit) VALUES ($1, $2) RETURNING id",
      [article.name, article.unit]
    );
    return result.rows[0].id;
  }

  /**
   * Supprime un article par son ID.
   *
   * @param id ID de l'article à supprimer
   * @returns Promise<number> Nombre de lignes supprimées
   * @throws Error si l'ID n'est pas fourni
   */
  async delete(id: number): Promise<number> {
    if (!id) throw new Error("Cannot delete undefined article");
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "DELETE FROM articles WHERE id = $1",
      [id]
    );
    return result.rowCount!;
  }

  /**
   * Recherche un article par son ID.
   *
   * @param id ID de l'article
   * @returns Promise<ArticleRow | undefined> L'article trouvé ou undefined
   */
  async findById(id: number): Promise<ArticleRow | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "SELECT * FROM articles WHERE id = $1",
      [id]
    );
    return result.rows[0] as ArticleRow | undefined;
  }

  /**
   * Récupère tous les articles de la base.
   *
   * @returns Promise<ArticleRow[] | undefined> Liste des articles
   */
  async findAll(): Promise<ArticleRow[] | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("SELECT * FROM articles");
    return result.rows as ArticleRow[] | undefined;
  }

  /**
   * Met à jour le nom d'un article.
   *
   * @param id ID de l'article
   * @param name Nouveau nom de l'article
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updateName(id: number, name: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "UPDATE articles SET name = $1 WHERE id = $2",
      [name, id]
    );
    return result.rowCount!;
  }

  /**
   * Met à jour l'unité d'un article.
   *
   * @param id ID de l'article
   * @param unit Nouvelle unité (ex: 'Kg', 'L')
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updateUnit(id: number, unit: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "UPDATE articles SET unit = $1 WHERE id = $2",
      [unit, id]
    );
    return result.rowCount!;
  }
}
