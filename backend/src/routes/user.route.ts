import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import { userController } from '../controllers/user.controller.js';

const router = Router();

router.delete('/delete/:id',authMiddleware,isAdmin,userController.delete);

router.post('/updateMail/:id',authMiddleware,userController.updateMail)

router.post('/updatePassword/:id',userController.updatePassword)

router.get('/:id',authMiddleware,isAdmin,userController.getUser);

router.get('/',authMiddleware,isAdmin,userController.getAllUsers);



export default router;
