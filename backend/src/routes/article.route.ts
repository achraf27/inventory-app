import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { articleController } from '../controllers/article.controller.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';

const router = Router();

// Liste tous les articles
router.get('/', authMiddleware, articleController.getAllArticles);

// Crée un article
router.post(
  '/add', 
  authMiddleware,
  checkBody(["name","unit"]), 
  articleController.create
);

// Récupère un article spécifique
router.get(
  '/:article_id', 
  authMiddleware, 
  checkParams(["article_id"]), 
  articleController.getArticle
);

// Met à jour un article
router.patch(
  '/update/:article_id',
  authMiddleware,
  checkParams(["article_id"]),
  checkBody(["name","unit"]),
  articleController.update
);

// Supprime un article
router.delete(
  '/delete/:article_id',
  authMiddleware,
  checkParams(["article_id"]),
  articleController.delete
);

export default router;
