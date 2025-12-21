import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { supplierController } from '../controllers/supplier.controller.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkSupplier } from '../middlewares/checkSupplier.middleware.js';

const router = Router();

router.post('/create',authMiddleware, checkBody(["contact_name","mail","phone","address"]) ,supplierController.create);
router.get('/:supplier_id',authMiddleware,checkParams(["supplier_id"]), supplierController.getSupplier);
router.get('/',authMiddleware,supplierController.getAllSuppliers);
router.patch('/update/:supplier_id',checkParams(["supplier_id"]),checkSupplier,authMiddleware,supplierController.update);
router.delete('/delete/:supplier_id',authMiddleware,checkParams(["supplier_id"]),supplierController.delete);

router.post('/:supplier_id/add/article/:article_id',authMiddleware,checkParams(["supplier_id","article_id"]),supplierController.addSupplierArticle)
router.delete('/:supplier_id/article/delete/:article_id',authMiddleware,checkParams(["supplier_id","article_id"]),supplierController.removeSupplierArticle)
router.get('/:supplier_id/article',authMiddleware,checkParams(["supplier_id"]),supplierController.getAllSupplierArticles)
router.get('article/:supplier_id/:article_id',authMiddleware,checkParams(["supplier_id","article_id"]),supplierController.getOneSupplierArticle)


export default router;
