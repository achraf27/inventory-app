import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';

const router = Router();

/**
 * @route   POST /auth/login
 * @desc    Authentifie un utilisateur et retourne un JWT
 * @body    name (string) - nom de l'utilisateur
 *          password (string) - mot de passe
 * @access  Public
 */
router.post('/login', checkBody(["name","password"]), authController.login);

/**
 * @route   POST /auth/register
 * @desc    Crée un nouvel utilisateur
 * @body    name (string) - nom de l'utilisateur
 *          password (string) - mot de passe
 *          mail (string) - email de l'utilisateur
 * @access  Public
 */
router.post('/register', checkBody(["name","password","mail"]), authController.register);

export default router;
