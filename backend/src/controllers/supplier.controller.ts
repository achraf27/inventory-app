import type { Request, Response } from "express";
import { SupplierRepository } from "../repositories/supplier.repository.js";

/**
 * Contrôleur pour gérer les fournisseurs et leurs articles.
 * Permet la création, modification, suppression des fournisseurs
 * et la gestion des articles associés à chaque fournisseur.
 */
export class SupplierController {
  private supplierRepo = new SupplierRepository();

  /**
   * Crée un fournisseur.
   * 
   * @param req Contient les informations du fournisseur dans `body` : contact_name, mail, phone, address
   * @param res Retourne le fournisseur créé et un message de succès
   */
  create = async (req: Request, res: Response) => {
    const { contact_name, mail, phone, address } = req.body;
    try {
      const supplier = await this.supplierRepo.createSupplier({ contact_name, mail, phone, address });
      return res.status(200).json({
        message: "supplier created successfully",
        supplier: supplier.toDto()
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Supprime un fournisseur spécifique.
   * 
   * @param req Contient `supplier_id` dans `params`
   * @param res Retourne un message de succès ou 404 si le fournisseur n'existe pas
   */
  delete = async (req: Request, res: Response) => {
    const { supplier_id } = req.params;
    try {
      const supplier = await this.supplierRepo.getSupplier(Number(supplier_id));
      if (!supplier) return res.status(404).json({ message: "supplier could not be deleted" });

      await this.supplierRepo.deleteSupplier(Number(supplier_id));
      return res.status(200).json({
        message: "supplier deleted successfully",
        supplier: { supplier_id }
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Met à jour un fournisseur spécifique.
   * 
   * @param req Contient `supplier_id` dans `params` et les champs à mettre à jour dans `body`
   * @param res Retourne un message de succès ou une erreur serveur
   */
  update = async (req: Request, res: Response) => {
    const { supplier_id } = req.params;
    const { contact_name, mail, phone, address } = req.body;
    try {
      await this.supplierRepo.updateSupplier(Number(supplier_id), { contact_name, mail, phone, address });
      return res.status(200).json({ message: "supplier updated successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Récupère un fournisseur spécifique.
   * 
   * @param req Contient `supplier_id` dans `params`
   * @param res Retourne le fournisseur ou 404 si non trouvé
   */
  getSupplier = async (req: Request, res: Response) => {
    const { supplier_id } = req.params;
    try {
      const supplier = await this.supplierRepo.getSupplier(Number(supplier_id));
      if (!supplier) return res.status(404).json({ message: "supplier not found" });

      return res.status(200).json({
        message: "supplier retrieved successfully",
        supplier: supplier.toDto()
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Récupère tous les fournisseurs.
   * 
   * @param req
   * @param res Retourne la liste des fournisseurs ou 404 si aucun trouvé
   */
  getAllSuppliers = async (req: Request, res: Response) => {
    try {
      const suppliers = await this.supplierRepo.getAllSuppliers();
      if (!suppliers) return res.status(404).json({ message: "suppliers not found" });

      return res.status(200).json({
        message: "suppliers retrieved successfully",
        suppliers
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Met à jour tous les articles d'un fournisseur.
   * 
   * @param req Contient `supplier_id` dans params et `articleIds` dans body
   * @param res Retourne un message de succès ou 404 si les articles n'ont pas pu être mis à jour
   */
  updateSupplierArticles = async (req: Request, res: Response) => {
    const { supplier_id } = req.params;
    const { articleIds } = req.body;
    try {
      const _delete = await this.supplierRepo.removeAllSupplierArticles(Number(supplier_id));
      await this.supplierRepo.updateSupplierArticles(Number(supplier_id), articleIds);

      if (!_delete) return res.status(404).json({ message: "articles could not be updated" });

      return res.status(200).json({ message: "articles updated successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Ajoute un article à un fournisseur.
   */
  addSupplierArticle = async (req: Request, res: Response) => {
    const { supplier_id, article_id } = req.params;
    try {
      const result = await this.supplierRepo.addArticle(Number(supplier_id), Number(article_id));
      if (!result) return res.status(404).json({ message: "article could not be added" });

      return res.status(200).json({ message: "article added successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Supprime un article d'un fournisseur.
   */
  removeSupplierArticle = async (req: Request, res: Response) => {
    const { supplier_id, article_id } = req.params;
    try {
      const result = await this.supplierRepo.removeSupplierArticle(Number(supplier_id), Number(article_id));
      if (!result) return res.status(404).json({ message: "article could not be removed" });

      return res.status(200).json({ message: "article removed successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Récupère tous les articles de tous les fournisseurs.
   */
  getAllSuppliersArticles = async (req: Request, res: Response) => {
    try {
      const articles = await this.supplierRepo.getAllSupplierArticles();
      if (!articles) return res.status(404).json({ message: "articles not found" });

      return res.status(200).json({
        message: "articles retrieved successfully",
        articles
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Récupère tous les articles pour un fournisseur spécifique.
   */
  getAllArticlesBySupplier = async (req: Request, res: Response) => {
    const { supplier_id } = req.params;
    try {
      const articles = await this.supplierRepo.getAllArticlesBySupplierId(Number(supplier_id));
      if (!articles) return res.status(404).json({ message: "articles not found" });

      return res.status(200).json({
        message: "supplier's articles retrieved successfully",
        articles
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Récupère un article spécifique d'un fournisseur.
   */
  getOneSupplierArticle = async (req: Request, res: Response) => {
    const { supplier_id, article_id } = req.params;
    try {
      if (isNaN(Number(supplier_id)) || isNaN(Number(article_id))) {
        return res.status(400).json({ message: "the given fields are not numbers" });
      }

      const supplierArticle = await this.supplierRepo.getOneSupplierArticle(Number(supplier_id), Number(article_id));
      if (!supplierArticle) return res.status(404).json({ message: "article not found" });

      return res.status(200).json({
        message: "article retrieved successfully",
        supplier: supplierArticle
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error: the article was not found" });
    }
  }
}

export const supplierController = new SupplierController();
