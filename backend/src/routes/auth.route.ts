import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';


const router = Router();

router.post('/login', checkBody(["name","password"]), authController.login);
router.post('/register',checkBody(["name","password","mail"]), authController.register)




export default router;
