import type { Request, Response, NextFunction } from "express";

/**
 * Middleware pour restreindre l'accès aux routes aux utilisateurs ayant le rôle "Admin".
 *
 * Vérifie que :
 * - `req.user` existe (injecté par le middleware d'authentification),
 * - le rôle de l'utilisateur est "Admin".
 *
 * Retourne :
 * - 401 Unauthorized si `req.user` n'existe pas,
 * - 403 Forbidden si l'utilisateur n'est pas un Admin.
 *
 * Usage :
 * ```ts
 * app.post("/admin-only-route", authMiddleware, isAdmin, adminController.action);
 * ```
 *
 * @param req - Objet Request d'Express (avec `user` injecté par le middleware JWT)
 * @param res - Objet Response d'Express
 * @param next - Fonction NextFunction pour passer au middleware suivant
 */
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  try {
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (user.role !== "Admin") return res.status(403).json({ error: "Forbidden admin only" });

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default isAdmin;
