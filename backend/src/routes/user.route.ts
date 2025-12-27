import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';
import { userController } from '../controllers/user.controller.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';

const router = Router();

router.post('/admin/user', authMiddleware,isAdmin,checkBody(["role","name","password","mail"]),    userController.createUser)

router.delete('/admin/delete/:user_id' ,authMiddleware,isAdmin,checkParams(["user_id"]),    userController.delete);

router.post('/update/mail', authMiddleware,checkBody(["newMail"]),    userController.updateMail)

router.post('/update/password', authMiddleware, checkBody(["newPassword"]),   userController.updatePassword)

router.post('/admin/update/:user_id/mail', authMiddleware,isAdmin,checkParams(["user_id"]),checkBody(["newMail"]),    userController.adminUpdateMail)

router.post('/admin/update/:user_id/password', authMiddleware,isAdmin,checkParams(["user_id"]), checkBody(["newPassword"]),   userController.adminUpdatePassword)

router.get('/admin/:user_id', authMiddleware,isAdmin,checkParams(["user_id"]),   userController.getUser);

router.get('/admin', authMiddleware,isAdmin,  userController.getAllUsers);



export default router;
