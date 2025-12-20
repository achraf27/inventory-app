import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { supplierController } from '../controllers/supplier.controller.js';
import { checkBody } from '../middlewares/checkBody.js';
import { checkParams } from '../middlewares/checkParams.js';

const router = Router();

router.post('/',authMiddleware, checkBody ,supplierController.create);
router.get('/:supplier_id',authMiddleware,checkParams,checkBody, supplierController.getSupplier);
router.get('/',authMiddleware,supplierController.getAllSuppliers);
router.patch('/updateSupplier/:supplier_id',checkParams,checkBody,authMiddleware,supplierController.update);
router.delete('/:supplier_id',authMiddleware,checkParams,supplierController.delete);

router.post('/article/:supplier_id/:article_id',authMiddleware,checkParams,supplierController.addSupplierArticle)
router.delete('/article/:supplier_id/:article_id',authMiddleware,checkParams,supplierController.removeSupplierArticle)
router.get('/article/:supplier_id',authMiddleware,checkParams,supplierController.getAllSupplierArticles)
router.get('article/:supplier_id/:article_id',authMiddleware,checkParams,supplierController.getOneSupplierArticle)


export default router;
