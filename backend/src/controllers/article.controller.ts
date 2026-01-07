import type { Request, Response } from "express";
import { ArticleRepository } from "../repositories/article.repository.js";

/**
 * Contrôleur pour gérer les articles.
 * Fournit des endpoints pour créer, récupérer, mettre à jour et supprimer des articles.
 */
export class ArticleController {
    private articleRepo = new ArticleRepository();

    /** Crée un nouvel article */
    create = async (req: Request, res: Response) => {
        const { name, unit } = req.body;
        try {
            const article = await this.articleRepo.createArticle({ name, unit });
            return res.status(200).json({ message: "article successfully created", article });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "server error" });
        }
    }

    /** Récupère un article par son ID */
    getArticle = async (req: Request, res: Response) => {
        const articleId = Number(req.params.article_id);
        try {
            const article = await this.articleRepo.getArticle(articleId);
            if (!article) return res.status(404).json({ message: "article not found" });

            return res.status(200).json({ message: "article retrieved successfully", article });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "server error" });
        }
    }

    /** Récupère tous les articles */
    getAllArticles = async (_req: Request, res: Response) => {
        try {
            const articles = await this.articleRepo.getAllArticles();
            if (!articles) return res.status(404).json({ message: "articles not found" });

            return res.status(200).json({ message: "articles retrieved successfully", articles });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "server error" });
        }
    }

    /** Met à jour un article existant */
    update = async (req: Request, res: Response) => {
        const articleId = Number(req.params.article_id);
        const { name, unit } = req.body;
        try {
            await this.articleRepo.updateArticle(articleId, { name, unit });
            return res.status(200).json({ message: "article updated successfully" });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "server error" });
        }
    }

    /** Supprime un article par son ID */
    delete = async (req: Request, res: Response) => {
        const articleId = Number(req.params.article_id);
        try {
            await this.articleRepo.deleteArticle(articleId);
            return res.status(200).json({ message: "article successfully deleted" });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "server error" });
        }
    }
}

export const articleController = new ArticleController();
