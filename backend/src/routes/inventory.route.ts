import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { inventoryController } from '../controllers/inventory.controller.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';

const router = Router();

router.post('/add/:article_id',authMiddleware,checkParams(["article_id"]),checkBody(["quantity"]),inventoryController.add)

router.delete('/delete/:article_id',authMiddleware,checkParams(["article_id"]),inventoryController.delete);

router.get('/:article_id',authMiddleware,checkParams(["article_id"]),inventoryController.getOneArticle);

router.get('/',authMiddleware,inventoryController.getAllArticles);

router.patch('/update/:article_id',authMiddleware,checkParams(["article_id"]),checkBody(["quantity"]),inventoryController.updateQuantity);

export default router;
