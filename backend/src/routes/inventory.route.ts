import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { inventoryController } from '../controllers/inventory.controller.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';

const router = Router();

/**
 * @route   GET /inventory/
 * @desc    Récupère tous les articles dans l'inventaire de l'utilisateur connecté
 * @access  Authenticated users
 */
router.get('/', authMiddleware, inventoryController.getAllArticles);

/**
 * @route   POST /inventory/add/:article_id
 * @desc    Ajoute un article à l'inventaire de l'utilisateur connecté
 * @param   article_id  L'ID de l'article à ajouter (dans params)
 * @body    quantity    La quantité à ajouter (dans body)
 * @access  Authenticated users
 */
router.post(
  '/add/:article_id',
  authMiddleware,
  checkParams(["article_id"]),
  checkBody(["quantity"]),
  inventoryController.add
);

/**
 * @route   DELETE /inventory/delete/:article_id
 * @desc    Supprime un article de l'inventaire de l'utilisateur connecté
 * @param   article_id  L'ID de l'article à supprimer (dans params)
 * @access  Authenticated users
 */
router.delete(
  '/delete/:article_id',
  authMiddleware,
  checkParams(["article_id"]),
  inventoryController.delete
);

/**
 * @route   GET /inventory/:article_id
 * @desc    Récupère un article précis dans l'inventaire de l'utilisateur connecté
 * @param   article_id  L'ID de l'article à récupérer (dans params)
 * @access  Authenticated users
 */
router.get(
  '/:article_id',
  authMiddleware,
  checkParams(["article_id"]),
  inventoryController.getOneArticle
);

/**
 * @route   PATCH /inventory/update/:article_id
 * @desc    Met à jour la quantité d'un article dans l'inventaire de l'utilisateur connecté
 * @param   article_id  L'ID de l'article à mettre à jour (dans params)
 * @body    quantity    La nouvelle quantité (dans body)
 * @access  Authenticated users
 */
router.patch(
  '/update/:article_id',
  authMiddleware,
  checkParams(["article_id"]),
  checkBody(["quantity"]),
  inventoryController.updateQuantity
);

export default router;
