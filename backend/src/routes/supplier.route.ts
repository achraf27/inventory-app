import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { supplierController } from '../controllers/supplier.controller.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkSupplier } from '../middlewares/checkSupplier.middleware.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';

const router = Router();

/**
 * @route   GET /supplier/articles
 * @desc    Récupère tous les articles de tous les fournisseurs
 * @access  Authenticated users
 */
router.get('/articles', authMiddleware, supplierController.getAllSuppliersArticles);

/**
 * @route   GET /supplier/
 * @desc    Récupère tous les fournisseurs
 * @access  Authenticated users
 */
router.get('/', authMiddleware, supplierController.getAllSuppliers);

/**
 * @route   GET /supplier/:supplier_id/articles
 * @desc    Récupère tous les articles d’un fournisseur spécifique
 * @param   supplier_id  L'ID du fournisseur
 * @access  Authenticated users
 */
router.get('/:supplier_id/articles', authMiddleware, checkParams(["supplier_id"]), supplierController.getAllArticlesBySupplier);

/**
 * @route   GET /supplier/:supplier_id/article/:article_id
 * @desc    Récupère un article précis d’un fournisseur spécifique
 * @param   supplier_id  L'ID du fournisseur
 * @param   article_id   L'ID de l'article
 * @access  Authenticated users
 */
router.get('/:supplier_id/article/:article_id', authMiddleware, checkParams(["supplier_id","article_id"]), supplierController.getOneSupplierArticle);

/**
 * @route   GET /supplier/:supplier_id
 * @desc    Récupère un fournisseur spécifique
 * @param   supplier_id  L'ID du fournisseur
 * @access  Authenticated users
 */
router.get('/:supplier_id', authMiddleware, checkParams(["supplier_id"]), supplierController.getSupplier);

/**
 * ========================
 * Admin routes
 * ========================
 */

/**
 * @route   POST /supplier/admin/create
 * @desc    Crée un nouveau fournisseur
 * @body    contact_name, mail, phone, address
 * @access  Admin only
 */
router.post('/admin/create', authMiddleware, isAdmin, checkBody(["contact_name","mail","phone","address"]), supplierController.create);

/**
 * @route   PATCH /supplier/admin/update/:supplier_id
 * @desc    Met à jour un fournisseur existant
 * @param   supplier_id  L'ID du fournisseur
 * @body    contact_name, mail, phone, address
 * @access  Admin only
 */
router.patch('/admin/update/:supplier_id', authMiddleware, isAdmin, checkParams(["supplier_id"]), checkSupplier, supplierController.update);

/**
 * @route   DELETE /supplier/admin/delete/:supplier_id
 * @desc    Supprime un fournisseur
 * @param   supplier_id  L'ID du fournisseur
 * @access  Admin only
 */
router.delete('/admin/delete/:supplier_id', authMiddleware, isAdmin, checkParams(["supplier_id"]), supplierController.delete);

/**
 * @route   POST /supplier/:supplier_id/admin/add/article/:article_id
 * @desc    Ajoute un article à un fournisseur
 * @param   supplier_id  L'ID du fournisseur
 * @param   article_id   L'ID de l'article à ajouter
 * @access  Admin only
 */
router.post('/:supplier_id/admin/add/article/:article_id', authMiddleware, isAdmin, checkParams(["supplier_id","article_id"]), supplierController.addSupplierArticle);

/**
 * @route   PUT /supplier/:supplier_id/admin/update/articles
 * @desc    Met à jour la liste d’articles d’un fournisseur
 * @param   supplier_id  L'ID du fournisseur
 * @body    articleIds  Tableau des IDs des articles à associer
 * @access  Admin only
 */
router.put('/:supplier_id/admin/update/articles', authMiddleware, isAdmin, checkParams(["supplier_id"]), supplierController.updateSupplierArticles);

/**
 * @route   DELETE /supplier/:supplier_id/admin/delete/article/:article_id
 * @desc    Supprime un article spécifique d’un fournisseur
 * @param   supplier_id  L'ID du fournisseur
 * @param   article_id   L'ID de l'article à supprimer
 * @access  Admin only
 */
router.delete('/:supplier_id/admin/delete/article/:article_id', authMiddleware, isAdmin, checkParams(["supplier_id","article_id"]), supplierController.removeSupplierArticle);

export default router;
