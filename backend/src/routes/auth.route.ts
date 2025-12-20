import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { checkBody } from '../middlewares/checkBody.js';


const router = Router();

router.post('/login', checkBody(["name","password"]), authController.login);
router.post('/register',checkBody(["role","name","password","mail"]), authController.register)




export default router;
