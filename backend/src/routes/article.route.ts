import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { articleController } from '../controllers/article.controller.js';

const router = Router();

router.post('/',authMiddleware, articleController.create);
router.get('/:id',authMiddleware,articleController.getArticle);
router.patch('/updateArticle/:id_article',authMiddleware,articleController.update);
router.delete('/:id_article',authMiddleware,articleController.delete);


export default router;
