import type { Request, Response } from "express";
import { InventoryRepository } from "../repositories/inventory.repository.js";

/**
 * Contrôleur pour gérer l'inventaire d'un utilisateur.
 * Permet d'ajouter, récupérer, mettre à jour et supprimer des articles dans l'inventaire.
 */
export class InventoryController {
    private inventoryRepo = new InventoryRepository();

    /**
     * Ajoute un article à l'inventaire de l'utilisateur connecté.
     * 
     * @param req Contient le `user.id` injecté par le middleware et `article_id` dans params + `quantity` dans le body
     * @param res Retourne l'article ajouté et un message de succès
     */
    add = async (req: Request, res: Response) => {
        const user_id = (req as any).user.id;
        const { article_id } = req.params;
        const { quantity } = req.body;

        try {
            const article = await this.inventoryRepo.addArticle({
                articleId: Number(article_id),
                userId: Number(user_id),
                quantity: Number(quantity)
            });

            return res.status(200).json({
                message: "Article successfully added",
                article
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Server error." });
        }
    }

    /**
     * Récupère tous les articles de l'inventaire pour l'utilisateur connecté.
     * 
     * @param req Contient `user.id` injecté par le middleware
     * @param res Retourne la liste des articles ou 404 si aucun article trouvé
     */
    getAllArticles = async (req: Request, res: Response) => {
        const user_id = (req as any).user.id;

        try {
            const articles = await this.inventoryRepo.getAllInventoryArticles(Number(user_id));
            console.log(articles);

            if (!articles) return res.status(404).json({ error: "Article not found" });

            return res.status(200).json({
                message: "Articles retrieved successfully",
                articles
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Server error." });
        }
    }

    /**
     * Récupère un article spécifique de l'inventaire de l'utilisateur connecté.
     * 
     * @param req Contient `user.id` et `article_id` dans params
     * @param res Retourne l'article ou 404 si non trouvé
     */
    getOneArticle = async (req: Request, res: Response) => {
        const user_id = (req as any).user.id;
        const { article_id } = req.params;

        try {
            const article = await this.inventoryRepo.getOneInventoryArticle(Number(article_id), Number(user_id));
            console.log(article);

            if (!article) return res.status(404).json({ error: "Article not found" });

            return res.status(200).json({
                message: "Article retrieved successfully",
                article
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Server error." });
        }
    }

    /**
     * Supprime un article de l'inventaire de l'utilisateur connecté.
     * 
     * @param req Contient `user.id` et `article_id` dans params
     * @param res Retourne un message de succès ou 404 si l'article n'existe pas
     */
    delete = async (req: Request, res: Response) => {
        const user_id = (req as any).user.id;
        const { article_id } = req.params;

        try {
            console.log("DELETE inventory", { user_id, article_id });

            const result = await this.inventoryRepo.removeArticle(Number(user_id), Number(article_id));

            if (result) return res.status(200).json({ message: "The article was successfully deleted." });
            return res.status(404).json({ message: "Article not found in inventory." });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Server error." });
        }
    }

    /**
     * Met à jour la quantité d'un article dans l'inventaire de l'utilisateur connecté.
     * 
     * @param req Contient `user.id`, `article_id` dans params et `quantity` dans body
     * @param res Retourne un message de succès
     */
    updateQuantity = async (req: Request, res: Response) => {
        const user_id = (req as any).user.id;
        const { article_id } = req.params;
        const { quantity } = req.body;

        try {
            await this.inventoryRepo.updateQuantity(Number(user_id), Number(article_id), Number(quantity));
            return res.status(200).json({ message: "The article was successfully updated." });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Server error." });
        }
    }
}

export const inventoryController = new InventoryController();
