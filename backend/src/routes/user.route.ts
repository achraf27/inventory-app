import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';
import { userController } from '../controllers/user.controller.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';

const router = Router();

router.delete('/delete/:user_id' ,authMiddleware,isAdmin,checkParams(["user_id"]),    userController.delete);

router.post('/updateMail/:user_id', authMiddleware,checkParams(["user_id"]),checkBody,    userController.updateMail)

router.post('/updatePassword/:user_id', authMiddleware, checkParams(["user_id"]), checkBody,   userController.updatePassword)

router.get('/:user_id', authMiddleware,isAdmin,checkParams(["user_id"]),   userController.getUser);

router.get('/', authMiddleware,isAdmin,  userController.getAllUsers);



export default router;
