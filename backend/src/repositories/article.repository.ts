import { Article } from "../models/article.js";
import { ArticleDao } from "../dao/article.dao.js";
import type { ArticleRow } from "../types/articleRow.js";

/**
 * Données nécessaires pour créer un article
 */
export type CreateArticleInput = {
  /** Nom de l'article */
  name: string;
  /** Unité de mesure (ex: "Kg", "L") */
  unit: string;
};

/**
 * Repository pour gérer les opérations sur les articles.
 * 
 * Fait le lien entre le DAO (base de données) et la couche métier (Article).
 */
export class ArticleRepository {
  private articleDao: ArticleDao;

  /**
   * Initialise le repository avec un DAO optionnel
   * @param dao - DAO pour accéder à la base (par défaut, un ArticleDao)
   */
  constructor(dao = new ArticleDao()) {
    this.articleDao = dao;
  }

  /**
   * Transforme une ligne de la base de données en objet métier Article
   * @param row - Ligne provenant de la table `articles`
   * @returns Instance de Article
   */
  private mapRowToArticle(row: ArticleRow): Article {
    return new Article(row.name, row.unit, row.id);
  }

  /**
   * Récupère un article par son identifiant
   * @param article_id - ID de l'article
   * @returns Article si trouvé, sinon undefined
   */
  public async getArticle(article_id: number): Promise<Article | undefined> {
    const row = await this.articleDao.findById(article_id);
    return row ? this.mapRowToArticle(row) : undefined;
  }

  /**
   * Récupère tous les articles
   * @returns Tableau d'articles ou undefined si aucun
   */
  public async getAllArticles(): Promise<Article[] | undefined> {
    const rows = await this.articleDao.findAll();
    return rows?.map(row => this.mapRowToArticle(row));
  }

  /**
   * Crée un nouvel article
   * @param _article - Données de l'article à créer
   * @returns Article créé avec l'ID attribué par la base
   */
  public async createArticle(_article: CreateArticleInput): Promise<Article> {
    const newArticle = new Article(_article.name, _article.unit);
    const id = await this.articleDao.insert(_article);
    newArticle.id = id;
    return newArticle;
  }

  /**
   * Supprime un article
   * @param id - ID de l'article à supprimer
   * @returns true si la suppression a eu lieu, false sinon
   */
  public async deleteArticle(id: number): Promise<boolean> {
    const changes = await this.articleDao.delete(id);
    return changes > 0;
  }

  /**
   * Met à jour un article
   * @param id - ID de l'article à mettre à jour
   * @param _article - Champs à mettre à jour (nom et/ou unité)
   * @returns true si une ou plusieurs modifications ont été appliquées, false sinon
   */
  public async updateArticle(id: number, _article: Partial<ArticleRow>): Promise<boolean> {
    let totalChanges = 0;

    if (_article.name !== undefined) totalChanges += await this.articleDao.updateName(id, _article.name);
    if (_article.unit !== undefined) totalChanges += await this.articleDao.updateUnit(id, _article.unit);

    return totalChanges > 0;
  }
}
