import type { ArticleRow } from "../types/articleRow.js";
import { Db } from "../database/dbSqlite.js";

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
    const db = await Db.getConnection();
    const result = await db.run(
      "INSERT INTO articles (name, unit) VALUES (?, ?)",
      article.name,
      article.unit
    );

    if (result.lastID === undefined) {
      throw new Error("Failed to get last inserted ID");
    }

    return result.lastID;
  }

  /**
   * Supprime un article par son ID.
   *
   * @param id ID de l'article à supprimer
   * @returns Promise<number> Nombre de lignes supprimées
   * @throws Error si l'ID n'est pas fourni
   */
  async delete(id: number): Promise<number> {
    if (!id) {
      throw new Error("Cannot delete undefined article");
    }
    const db = await Db.getConnection();
    const result = await db.run("DELETE FROM articles WHERE id = ?", id);
    return result.changes!;
  }

  /**
   * Recherche un article par son ID.
   *
   * @param id ID de l'article
   * @returns Promise<ArticleRow | undefined> L'article trouvé ou undefined
   */
  async findById(id: number): Promise<ArticleRow | undefined> {
    const db = await Db.getConnection();
    const row = await db.get("SELECT * FROM articles WHERE id = ?", id);
    return row as ArticleRow | undefined;
  }

  /**
   * Récupère tous les articles de la base.
   *
   * @returns Promise<ArticleRow[] | undefined> Liste des articles
   */
  async findAll(): Promise<ArticleRow[] | undefined> {
    const db = await Db.getConnection();
    const rows = await db.all("SELECT * FROM articles");
    return rows as ArticleRow[] | undefined;
  }

  /**
   * Met à jour le nom d'un article.
   *
   * @param id ID de l'article
   * @param name Nouveau nom de l'article
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updateName(id: number, name: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE articles SET name = ? WHERE id = ?", name, id);
    return result.changes!;
  }

  /**
   * Met à jour l'unité d'un article.
   *
   * @param id ID de l'article
   * @param unit Nouvelle unité (ex: 'Kg', 'L')
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updateUnit(id: number, unit: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE articles SET unit = ? WHERE id = ?", unit, id);
    return result.changes!;
  }
}
