import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { inventoryController } from '../controllers/inventory.controller.js';

const router = Router();

router.post('/add/:user_id/:article_id',authMiddleware,inventoryController.add)

router.delete('/delete/:user_id/:article_id',authMiddleware,inventoryController.delete);

router.get('/:user_id/:article_id',authMiddleware,inventoryController.getOneArticle);

router.get('/:user_id',authMiddleware,inventoryController.getAllArticles);



export default router;
