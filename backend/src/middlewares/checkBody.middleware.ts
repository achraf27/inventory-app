import type { Request, Response, NextFunction } from "express";

/**
 * Middleware générateur pour vérifier la présence et la validité de champs dans le corps de la requête.
 *
 * Vérifie que :
 * - le corps de la requête n'est pas vide,
 * - tous les champs requis sont définis et non nuls,
 * - les chaînes de caractères ne sont pas vides ou composées uniquement d'espaces.
 *
 * Usage :
 * ```ts
 * app.post("/route", checkBody(["name", "email"]), handler);
 * ```
 *
 * @param requiredFields - Tableau des champs requis dans `req.body`. Par défaut vide.
 * @returns Middleware Express pour valider le corps de la requête
 */
export const checkBody = (requiredFields: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Invalid parameter" });
    }

    for (const field of requiredFields) {
      const value = req.body[field];

      if (value === undefined || value === null) {
        return res.status(400).json({ error: `Missing field: ${field}` });
      }

      if (typeof value === "string" && value.trim().length === 0) {
        return res.status(400).json({ error: `Empty field: ${field}` });
      }
    }

    next();
  };
