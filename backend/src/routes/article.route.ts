import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { articleController } from '../controllers/article.controller.js';
import { checkBody } from '../middlewares/checkBody.js';
import { checkParams } from '../middlewares/checkParams.js';

const router = Router();

router.post('/add',authMiddleware,checkBody(["name","unit"]), articleController.create);
router.get('/:id',authMiddleware,checkParams, articleController.getArticle);
router.patch('/update/:id_article',checkParams,checkBody,authMiddleware,articleController.update);
router.delete('/delete/:id_article',authMiddleware,checkParams(["id_article"]),articleController.delete);


export default router;
