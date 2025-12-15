import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { supplierController } from '../controllers/supplier.controller.js';

const router = Router();

router.post('/',authMiddleware, supplierController.create);
router.get('/:supplier_id',authMiddleware,supplierController.getSupplier);
router.get('/',authMiddleware,supplierController.getAllSuppliers);
router.patch('/updateSupplier/:supplier_id',authMiddleware,supplierController.update);
router.delete('/:supplier_id',authMiddleware,supplierController.delete);


export default router;
