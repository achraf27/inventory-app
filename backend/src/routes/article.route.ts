import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { articleController } from '../controllers/article.controller.js';
import { checkBody } from '../middlewares/checkBody.js';
import { checkParams } from '../middlewares/chechkParams.js';

const router = Router();

router.post('/',authMiddleware,checkBody, articleController.create);
router.get('/:id',authMiddleware,checkParams, articleController.getArticle);
router.patch('/updateArticle/:id_article',checkParams,checkBody,authMiddleware,articleController.update);
router.delete('/:id_article',authMiddleware,checkParams,articleController.delete);


export default router;
