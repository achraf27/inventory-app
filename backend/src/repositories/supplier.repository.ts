import { Supplier } from "../models/supplier.js";
import { SupplierArticle } from "../models/supplierArticle.js";
import { SupplierDao } from "../dao/supplier.dao.js";
import { SupplierArticleDao } from "../dao/supplierArticle.dao.js";
import type { SupplierRow } from "../types/supplierRow.js";
import type { SupplierArticleRow } from "../types/supplierArticleRow.js";

/**
 * Données nécessaires pour créer un fournisseur
 */
export type CreateSupplierInput = {
  /** Nom du contact */
  contact_name: string;
  /** Email du fournisseur */
  mail: string;
  /** Téléphone du fournisseur */
  phone: string;
  /** Adresse du fournisseur */
  address: string;
};

/**
 * Repository pour gérer les opérations sur les fournisseurs
 * et leurs articles associés.
 */
export class SupplierRepository {
  private supplierDao: SupplierDao;
  private supplierArticleDao: SupplierArticleDao;

  /**
   * Initialise le repository avec des DAO optionnels
   * @param supplierDao - DAO pour la table suppliers
   * @param supplierArticleDao - DAO pour la table suppliers_articles
   */
  constructor(
    supplierDao = new SupplierDao(),
    supplierArticleDao = new SupplierArticleDao()
  ) {
    this.supplierDao = supplierDao;
    this.supplierArticleDao = supplierArticleDao;
  }

  /**
   * Transforme une ligne SupplierRow en objet Supplier
   * @param row - Ligne de la table suppliers
   * @returns Instance de Supplier
   */
  private mapRowToSupplier(row: SupplierRow): Supplier {
    return new Supplier(
      row.contact_name,
      row.mail,
      row.phone,
      row.address,
      row.id
    );
  }

  /**
   * Transforme une ligne SupplierArticleRow en objet SupplierArticle
   * @param row - Ligne de la table suppliers_articles join articles
   * @returns Instance de SupplierArticle
   */
  private mapRowToSupplierArticle(row: SupplierArticleRow): SupplierArticle {
    return new SupplierArticle(
      row.article_id,
      row.supplier_id,
      row.contact_name ?? "Unknown",
      row.name ?? "Unknown",
      row.unit ?? "Unknown"
    );
  }

  /**
   * Récupère un fournisseur par son ID
   * @param supplierId - ID du fournisseur
   * @returns Supplier si trouvé, sinon undefined
   */
  public async getSupplier(supplierId: number): Promise<Supplier | undefined> {
    const row = await this.supplierDao.findBySupplierId(supplierId);
    return row ? this.mapRowToSupplier(row) : undefined;
  }

  /**
   * Récupère tous les fournisseurs
   * @returns Tableau de Supplier
   */
  public async getAllSuppliers(): Promise<Supplier[] | undefined> {
    const rows = await this.supplierDao.findAllSuppliers();
    return rows.map(row => this.mapRowToSupplier(row));
  }

  /**
   * Crée un nouveau fournisseur
   * @param _supplier - Données du fournisseur à créer
   * @returns Le fournisseur créé avec son ID
   */
  public async createSupplier(_supplier: CreateSupplierInput): Promise<Supplier> {
    const newSupplier = new Supplier(
      _supplier.contact_name,
      _supplier.mail,
      _supplier.phone,
      _supplier.address
    );
    const id = await this.supplierDao.insert(_supplier);
    newSupplier.id = id;
    return newSupplier;
  }

  /**
   * Supprime un fournisseur
   * @param supplierId - ID du fournisseur
   * @returns true si supprimé, false sinon
   */
  public async deleteSupplier(supplierId: number): Promise<boolean> {
    const result = await this.supplierDao.delete(supplierId);
    return result > 0;
  }

  /**
   * Met à jour les informations d'un fournisseur
   * @param id - ID du fournisseur
   * @param _supplier - Champs à mettre à jour
   * @returns true si des modifications ont été appliquées, false sinon
   */
  public async updateSupplier(id: number, _supplier: Partial<SupplierRow>): Promise<boolean> {
    let totalChanges = 0;

    if (_supplier.contact_name !== undefined) totalChanges += await this.supplierDao.updateName(id, _supplier.contact_name);
    if (_supplier.mail !== undefined) totalChanges += await this.supplierDao.updateMail(id, _supplier.mail);
    if (_supplier.phone !== undefined) totalChanges += await this.supplierDao.updatePhone(id, _supplier.phone);
    if (_supplier.address !== undefined) totalChanges += await this.supplierDao.updateAddress(id, _supplier.address);

    return totalChanges > 0;
  }

  /**
   * Met à jour la liste des articles d'un fournisseur
   * @param supplierId - ID du fournisseur
   * @param articleIds - IDs des articles à associer
   */
  public async updateSupplierArticles(supplierId: number, articleIds: number[]): Promise<void> {
    await this.supplierArticleDao.insertArticles(supplierId, articleIds);
  }

  /**
   * Ajoute un article à un fournisseur
   * @param supplierId - ID du fournisseur
   * @param article_id - ID de l'article
   * @returns true si ajouté, false sinon
   */
  public async addArticle(supplierId: number, article_id: number): Promise<boolean> {
    const result = await this.supplierArticleDao.insertOneArticle({ supplier_id: supplierId, article_id });
    return result > 0;
  }

  /**
   * Supprime tous les articles associés à un fournisseur
   * @param supplierId - ID du fournisseur
   * @returns true si supprimé, false sinon
   */
  public async removeAllSupplierArticles(supplierId: number): Promise<boolean> {
    const result = await this.supplierArticleDao.deleteAllArticlesBySupplier(supplierId);
    return result > 0;
  }

  /**
   * Supprime un article spécifique d'un fournisseur
   * @param supplierId - ID du fournisseur
   * @param article_id - ID de l'article
   * @returns true si supprimé, false sinon
   */
  public async removeSupplierArticle(supplierId: number, article_id: number): Promise<boolean> {
    const result = await this.supplierArticleDao.delete({ supplier_id: supplierId, article_id });
    return result > 0;
  }

  /**
   * Récupère tous les articles de tous les fournisseurs
   * @returns Tableau de SupplierArticle
   */
  public async getAllSupplierArticles(): Promise<SupplierArticle[] | undefined> {
    const rows = await this.supplierArticleDao.findAllSuppliersArticles();
    return rows ? rows.map(row => this.mapRowToSupplierArticle(row)) : undefined;
  }

  /**
   * Récupère tous les articles d'un fournisseur spécifique
   * @param supplierId - ID du fournisseur
   * @returns Tableau de SupplierArticle
   */
  public async getAllArticlesBySupplierId(supplierId: number): Promise<SupplierArticle[] | undefined> {
    const rows = await this.supplierArticleDao.findBySupplierId(supplierId);
    return rows ? rows.map(row => this.mapRowToSupplierArticle(row)) : undefined;
  }

  /**
   * Récupère un article spécifique d'un fournisseur
   * @param supplierId - ID du fournisseur
   * @param articleId - ID de l'article
   * @returns SupplierArticle si trouvé, sinon undefined
   */
  public async getOneSupplierArticle(supplierId: number, articleId: number): Promise<SupplierArticle | undefined> {
    const row = await this.supplierArticleDao.findOneArticle(supplierId, articleId);
    return row ? this.mapRowToSupplierArticle(row) : undefined;
  }
}
