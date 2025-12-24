import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';
import { userController } from '../controllers/user.controller.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';

const router = Router();

router.delete('/admin/delete/:user_id' ,authMiddleware,isAdmin,checkParams(["user_id"]),    userController.delete);

router.post('/updateMail', authMiddleware,checkParams(["user_id"]),checkBody(["newMail"]),    userController.updateMail)

router.post('/updatePassword', authMiddleware, checkParams(["user_id"]), checkBody(["newPassword"]),   userController.updatePassword)

router.get('/admin/:user_id', authMiddleware,isAdmin,checkParams(["user_id"]),   userController.getUser);

router.get('/admin', authMiddleware,isAdmin,  userController.getAllUsers);



export default router;
