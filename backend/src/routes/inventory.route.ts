import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { inventoryController } from '../controllers/inventory.controller.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';

const router = Router();

router.post('/add/:user_id/:article_id',authMiddleware,checkParams(["user_id","article_id"]),checkBody(["quantity"]),inventoryController.add)

router.delete('/delete/:user_id/:article_id',authMiddleware,checkParams(["user_id","article_id"]),inventoryController.delete);

router.get('/:user_id/:article_id',authMiddleware,checkParams(["user_id","article_id"]),inventoryController.getOneArticle);

router.get('/:user_id',authMiddleware,checkParams(["user_id"]),inventoryController.getAllArticles);

router.patch('/update/:user_id/:article_id',authMiddleware,checkParams(["user_id","article_id"]),checkBody(["quantity"]),inventoryController.updateQuantity);

export default router;
