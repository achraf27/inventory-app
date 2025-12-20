import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import { userController } from '../controllers/user.controller.js';
import { checkParams } from '../middlewares/checkParams.js';
import { checkBody } from '../middlewares/checkBody.js';

const router = Router();

router.delete('/delete/:id' ,authMiddleware,isAdmin,checkParams(["id"]),    userController.delete);

router.post('/updateMail/:id', authMiddleware,checkParams,checkBody,    userController.updateMail)

router.post('/updatePassword/:id', authMiddleware, checkParams, checkBody,   userController.updatePassword)

router.get('/:id', authMiddleware,isAdmin,checkParams,   userController.getUser);

router.get('/', authMiddleware,isAdmin,  userController.getAllUsers);



export default router;
