import type { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const DEFAULT_ROLE = "User";

/**
 * Contrôleur pour gérer l'authentification des utilisateurs.
 * Fournit des endpoints pour l'enregistrement et la connexion des utilisateurs.
 */
export class AuthController {
    private authRepo = new UserRepository();

    /**
     * Connecte un utilisateur existant.
     * - Vérifie que l'utilisateur existe
     * - Vérifie le mot de passe
     * - Retourne un JWT et les informations utilisateur
     * 
     * @param req Requête HTTP contenant `name` et `password` dans le body
     * @param res Réponse HTTP
     */
    login = async (req: Request, res: Response) => {
        const { name, password } = req.body;

        try {
            const user = await this.authRepo.getUser(name);
            console.log(user);

            if (!user) return res.status(401).json({ message: "Invalid User" });

            const ok = await user.verifyPassword(password);

            const token = jwt.sign(
                { id: user.id, role: user.role, name },
                process.env.JWT_SECRET!,
                { expiresIn: "20d" }
            );

            if (ok) {
                return res.status(200).json({ message: "Login successful", token, user: user.toDto() });
            } else {
                return res.status(401).json({ message: "Login failed" });
            }

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Server error." });
        }
    }

    /**
     * Enregistre un nouvel utilisateur.
     * - Hash le mot de passe
     * - Attribue le rôle (Admin si en test et demandé, sinon User)
     * - Retourne un JWT et les informations utilisateur
     * 
     * @param req Requête HTTP contenant `name`, `password`, `mail` et éventuellement `role` dans le body
     * @param res Réponse HTTP
     */
    register = async (req: Request, res: Response) => {
        const { name, password, mail } = req.body;
        const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));

        console.log("creation attempt name: " + name);

        const finalRole =
            process.env.NODE_ENV === "test" && req.body.role === "Admin"
                ? "Admin"
                : DEFAULT_ROLE;

        try {
            const user = await this.authRepo.createUser({ role: finalRole, name, mail, passwordhash: hash });

            const token = jwt.sign(
                { id: user.id, role: user.role, name },
                process.env.JWT_SECRET!,
                { expiresIn: "20d" }
            );

            return res.status(201).json({
                message: "user created",
                token,
                user: user.toDto()
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "server error" });
        }
    }
}

export const authController = new AuthController();
