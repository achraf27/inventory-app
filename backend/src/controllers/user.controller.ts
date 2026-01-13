import type { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from 'bcryptjs';

/**
 * Contrôleur pour gérer les utilisateurs.
 * Permet la création, la mise à jour, la suppression et la récupération des utilisateurs.
 * Supporte les actions admin et les actions pour l'utilisateur connecté.
 */
export class UserController {
  private userRepo = new UserRepository();

  /**
   * Crée un nouvel utilisateur.
   * 
   * @param req Contient `role`, `name`, `password`, `mail` dans body
   * @param res Retourne l'utilisateur créé ou une erreur serveur
   */
  createUser = async (req: Request, res: Response) => {
    const { role, name, password, mail } = req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
    try {
      const user = await this.userRepo.createUser({ role, name, mail, passwordhash: hash });
      return res.status(201).json({ message: "user created", user });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Supprime un utilisateur spécifique.
   * 
   * @param req Contient `user_id` dans params
   * @param res Retourne un message de succès ou 404 si l'utilisateur n'existe pas
   */
  delete = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    console.log("delete attempt:", user_id);

    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      await this.userRepo.deleteUser(Number(user_id));
      return res.status(200).json({ message: "account deleted successfully", user: { user_id } });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Met à jour le nom de l'utilisateur connecté.
   */
  updateName = async (req: Request, res: Response) => {
    const { newName } = req.body;
    const user_id = (req as any).user.id;

    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      const changes = await this.userRepo.updateName(Number(user_id), newName);
      if (!changes) return res.status(404).json({ message: "could not update the name" });

      return res.status(200).json({ message: "name changed successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Met à jour le mail de l'utilisateur connecté.
   */
  updateMail = async (req: Request, res: Response) => {
    const { newMail } = req.body;
    const user_id = (req as any).user.id;

    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      const changes = await this.userRepo.updateMail(Number(user_id), newMail);
      if (!changes) return res.status(404).json({ message: "could not update the mail" });

      return res.status(200).json({ message: "mail changed successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Met à jour le mot de passe de l'utilisateur connecté.
   */
  updatePassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const user_id = (req as any).user.id;

    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      const hash = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS!));
      const changes = await this.userRepo.updatePassword(Number(user_id), hash);
      if (!changes) return res.status(404).json({ message: "could not update the password" });

      return res.status(200).json({ message: "password changed successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Récupère un utilisateur spécifique par son ID.
   */
  getUser = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      return res.status(200).json({ message: "user retrieved successfully", user: user.toDto() });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "user was not found" });
    }
  }

  /**
   * Récupère tous les utilisateurs.
   */
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userRepo.getAllUsers();
      if (!users) return res.status(404).json({ message: "users not found" });

      return res.status(200).json({ message: "users retrieved successfully", users });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "users were not found" });
    }
  }

  /**
   * Met à jour le rôle d'un utilisateur (admin only).
   */
  adminUpdateRole = async (req: Request, res: Response) => {
    const { newRole } = req.body;
    const { user_id } = req.params;

    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      const changes = await this.userRepo.updateRole(Number(user_id), newRole);
      if (!changes) return res.status(404).json({ message: "could not update the role" });

      return res.status(200).json({ message: "role changed successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Met à jour le nom d'un utilisateur (admin only).
   */
  adminUpdateName = async (req: Request, res: Response) => {
    const { newName } = req.body;
    const { user_id } = req.params;

    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      const changes = await this.userRepo.updateName(Number(user_id), newName);
      if (!changes) return res.status(404).json({ message: "could not update the name" });

      return res.status(200).json({ message: "name changed successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Met à jour le mail d'un utilisateur (admin only).
   */
  adminUpdateMail = async (req: Request, res: Response) => {
    const { newMail } = req.body;
    const { user_id } = req.params;

    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      const changes = await this.userRepo.updateMail(Number(user_id), newMail);
      if (!changes) return res.status(404).json({ message: "could not update the mail" });

      return res.status(200).json({ message: "mail changed successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * Met à jour le mot de passe d'un utilisateur (admin only).
   */
  adminUpdatePassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const { user_id } = req.params;

    try {
      const user = await this.userRepo.getUser(Number(user_id));
      if (!user) return res.status(404).json({ message: "user not found" });

      const hash = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS!));
      const changes = await this.userRepo.updatePassword(Number(user_id), hash);
      if (!changes) return res.status(404).json({ message: "could not update the password" });

      return res.status(200).json({ message: "password changed successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "server error" });
    }
  }
}

export const userController = new UserController();
