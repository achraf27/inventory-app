import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { articleController } from '../controllers/article.controller.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';

const router = Router();

router.post('/add',authMiddleware,checkBody(["name","unit"]), articleController.create);
router.get('/:id',authMiddleware,checkParams(["article_id"]), articleController.getArticle);
router.patch('/update/:article_id',checkParams(["article_id"]),checkBody(["name","unit"]),authMiddleware,articleController.update);
router.delete('/delete/:article_id',authMiddleware,checkParams(["article_id"]),articleController.delete);


export default router;
