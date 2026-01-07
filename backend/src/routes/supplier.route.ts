import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { supplierController } from '../controllers/supplier.controller.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkSupplier } from '../middlewares/checkSupplier.middleware.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';

const router = Router();

// Fix routes

router.get('/articles',authMiddleware,supplierController.getAllSuppliersArticles)
router.get('/',authMiddleware,supplierController.getAllSuppliers);

//Params routes

router.get('/:supplier_id/articles',authMiddleware,checkParams(["supplier_id"]),supplierController.getAllArticlesBySupplier)
router.get('/:supplier_id/article/:article_id',authMiddleware,checkParams(["supplier_id","article_id"]),supplierController.getOneSupplierArticle)
router.get('/:supplier_id',authMiddleware,checkParams(["supplier_id"]), supplierController.getSupplier);

// Admin routes

router.post('/admin/create',authMiddleware,isAdmin, checkBody(["contact_name","mail","phone","address"]) ,supplierController.create);
router.patch('/admin/update/:supplier_id',authMiddleware,isAdmin,checkParams(["supplier_id"]),checkSupplier,supplierController.update);
router.delete('/admin/delete/:supplier_id',authMiddleware,isAdmin,checkParams(["supplier_id"]),supplierController.delete);
router.post('/:supplier_id/admin/add/article/:article_id',authMiddleware,isAdmin,checkParams(["supplier_id","article_id"]),supplierController.addSupplierArticle)
router.put('/:supplier_id/admin/update/articles',authMiddleware,isAdmin,checkParams(["supplier_id"]),supplierController.updateSupplierArticles)
router.delete('/:supplier_id/admin/delete/article/:article_id',authMiddleware,isAdmin,checkParams(["supplier_id","article_id"]),supplierController.removeSupplierArticle)


export default router;
