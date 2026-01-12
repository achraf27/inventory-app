import { InventoryDao } from "../dao/inventory.dao.js";
import type { InventoryArticleRow } from "../types/inventoryRow.js";
import { Inventory } from "../models/inventory.js";
import { InventoryArticle } from "../models/inventoryArticle.js";

/**
 * Données nécessaires pour créer un inventaire (ajout d'un article pour un utilisateur)
 */
export type CreateInventoryInput = {
  /** ID de l'utilisateur */
  userId: number;
  /** ID de l'article */
  articleId: number;
  /** Quantité de l'article */
  quantity: number;
 

};

/**
 * Repository pour gérer les opérations sur l'inventaire.
 * 
 * Sert de passerelle entre le DAO (base de données) et les objets métier Inventory/InventoryArticle.
 */
export class InventoryRepository {
  private inventoryDao: InventoryDao;

  /**
   * Initialise le repository avec un DAO optionnel
   * @param dao - DAO pour accéder à la base (par défaut, un InventoryDao)
   */
  constructor(dao = new InventoryDao()) {
    this.inventoryDao = dao;
  }

  /**
   * Transforme une ligne de la table inventory join articles en objet InventoryArticle
   * @param row - Ligne provenant de la base
   * @returns Instance de InventoryArticle
   */
  private mapRowToInventoryArticle(row: InventoryArticleRow): InventoryArticle {
      const addedAtDate = row.addedAt ? new Date(row.addedAt) : new Date();
    return new InventoryArticle(
      row.user_id,
      row.article_id,
      row.name,
      row.quantity,
      row.unit,
      addedAtDate
    );
  }

  /**
   * Ajoute un article à l'inventaire d'un utilisateur
   * @param _inventory - Données de l'article à ajouter
   * @returns L'article ajouté sous forme d'objet Inventory
   */
  async addArticle(_inventory: CreateInventoryInput): Promise<Inventory> {
    
     await this.inventoryDao.insert({
      user_id: _inventory.userId,
      article_id: _inventory.articleId,
      quantity: _inventory.quantity,
    });

    const newInventory = new Inventory(_inventory.userId, _inventory.articleId, _inventory.quantity,new Date());
    return newInventory;
  }

  /**
   * Récupère tous les articles d'un utilisateur
   * @param userId - ID de l'utilisateur
   * @returns Tableau d'InventoryArticle
   */
  async getAllInventoryArticles(userId: number): Promise<InventoryArticle[]> {
    const rows = await this.inventoryDao.findByUserId(userId);
    return rows!.map(row => this.mapRowToInventoryArticle(row));
  }

  /**
   * Récupère un article spécifique de l'inventaire d'un utilisateur
   * @param userId - ID de l'utilisateur
   * @param articleId - ID de l'article
   * @returns InventoryArticle si trouvé, sinon undefined
   */
  async getOneInventoryArticle(userId: number, articleId: number): Promise<InventoryArticle | undefined> {
    const row = await this.inventoryDao.findOneArticle(userId, articleId);
    return row ? this.mapRowToInventoryArticle(row) : undefined;
  }

  /**
   * Supprime un article de l'inventaire d'un utilisateur
   * @param userId - ID de l'utilisateur
   * @param articleId - ID de l'article
   * @returns true si la suppression a eu lieu, false sinon
   */
  async removeArticle(userId: number, articleId: number): Promise<boolean> {
    return await this.inventoryDao.delete(userId, articleId) > 0;
  }

  /**
   * Met à jour la quantité d'un article dans l'inventaire d'un utilisateur
   * @param userId - ID de l'utilisateur
   * @param articleId - ID de l'article
   * @param quantity - Nouvelle quantité
   * @returns true si la modification a été appliquée, false sinon
   */
  async updateQuantity(userId: number, articleId: number, quantity: number): Promise<boolean> {
    return await this.inventoryDao.updateQuantity(userId, articleId, quantity) > 0;
  }
}
