import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';
import { userController } from '../controllers/user.controller.js';
import { checkParams } from '../middlewares/checkParams.middleware.js';
import { checkBody } from '../middlewares/checkBody.middleware.js';

const router = Router();

/**
 * ========================
 * Admin routes
 * ========================
 */

/**
 * @route   GET /user/admin
 * @desc    Récupère tous les utilisateurs
 * @access  Admin only
 */
router.get('/admin', authMiddleware, isAdmin, userController.getAllUsers);

/**
 * @route   POST /user/admin/user
 * @desc    Crée un nouvel utilisateur
 * @body    role, name, mail, password
 * @access  Admin only
 */
router.post('/admin/user', authMiddleware, isAdmin, checkBody(["role","name","password","mail"]), userController.createUser);

/**
 * @route   DELETE /user/admin/delete/:user_id
 * @desc    Supprime un utilisateur spécifique
 * @param   user_id  ID de l'utilisateur à supprimer
 * @access  Admin only
 */
router.delete('/admin/delete/:user_id', authMiddleware, isAdmin, checkParams(["user_id"]), userController.delete);

/**
 * @route   PATCH /user/update/name
 * @desc    Met à jour le nom de l’utilisateur connecté
 * @body    newName
 * @access  Authenticated users
 */
router.patch('/update/name', authMiddleware, checkBody(["newName"]), userController.updateName);

/**
 * @route   PATCH /user/update/mail
 * @desc    Met à jour le mail de l’utilisateur connecté
 * @body    newMail
 * @access  Authenticated users
 */
router.patch('/update/mail', authMiddleware, checkBody(["newMail"]), userController.updateMail);

/**
 * @route   PATCH /user/update/password
 * @desc    Met à jour le mot de passe de l’utilisateur connecté
 * @body    newPassword
 * @access  Authenticated users
 */
router.patch('/update/password', authMiddleware, checkBody(["newPassword"]), userController.updatePassword);

/**
 * ========================
 * Admin update routes
 * ========================
 */

/**
 * @route   PATCH /user/admin/update/:user_id/role
 * @desc    Met à jour le rôle d’un utilisateur
 * @param   user_id  ID de l'utilisateur
 * @body    newRole
 * @access  Admin only
 */
router.patch('/admin/update/:user_id/role', authMiddleware, isAdmin, checkParams(["user_id"]), checkBody(["newRole"]), userController.adminUpdateRole);

/**
 * @route   PATCH /user/admin/update/:user_id/name
 * @desc    Met à jour le nom d’un utilisateur
 * @param   user_id  ID de l'utilisateur
 * @body    newName
 * @access  Admin only
 */
router.patch('/admin/update/:user_id/name', authMiddleware, isAdmin, checkParams(["user_id"]), checkBody(["newName"]), userController.adminUpdateName);

/**
 * @route   PATCH /user/admin/update/:user_id/mail
 * @desc    Met à jour le mail d’un utilisateur
 * @param   user_id  ID de l'utilisateur
 * @body    newMail
 * @access  Admin only
 */
router.patch('/admin/update/:user_id/mail', authMiddleware, isAdmin, checkParams(["user_id"]), checkBody(["newMail"]), userController.adminUpdateMail);

/**
 * @route   PATCH /user/admin/update/:user_id/password
 * @desc    Met à jour le mot de passe d’un utilisateur
 * @param   user_id  ID de l'utilisateur
 * @body    newPassword
 * @access  Admin only
 */
router.patch('/admin/update/:user_id/password', authMiddleware, isAdmin, checkParams(["user_id"]), checkBody(["newPassword"]), userController.adminUpdatePassword);

/**
 * @route   GET /user/admin/:user_id
 * @desc    Récupère un utilisateur spécifique
 * @param   user_id  ID de l'utilisateur
 * @access  Admin only
 */
router.get('/admin/:user_id', authMiddleware, isAdmin, checkParams(["user_id"]), userController.getUser);

export default router;
