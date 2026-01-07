import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware d'authentification pour protéger les routes.
 * 
 * Vérifie que la requête contient un token JWT valide dans l'en-tête `Authorization`.
 * Si le token est valide, les informations décodées sont ajoutées à `req.user`.
 * Sinon, la requête est rejetée avec un statut 401.
 * 
 * @param req - L'objet Express Request
 * @param res - L'objet Express Response
 * @param next - La fonction NextFunction pour passer au middleware suivant
 * 
 * @returns void | Response JSON avec un message d'erreur si non autorisé
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded; // Ajoute les infos de l'utilisateur décodé à la requête
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;
