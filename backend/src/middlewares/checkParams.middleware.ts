import type { Request, Response, NextFunction } from "express";

/**
 * Middleware générateur pour vérifier la présence, la validité et le type des paramètres dans `req.params`.
 *
 * Vérifie que :
 * - `req.params` n'est pas vide,
 * - tous les champs requis sont définis et non nuls,
 * - les chaînes de caractères ne sont pas vides ou composées uniquement d'espaces,
 * - les champs numériques sont des entiers valides.
 *
 * Usage :
 * ```ts
 * app.get("/user/:user_id", checkParams(["user_id"]), handler);
 * ```
 *
 * @param requiredFields - Tableau des noms de paramètres requis dans `req.params`. Par défaut vide.
 * @returns Middleware Express pour valider les paramètres de la requête
 */
export const checkParams = (requiredFields: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {

    if (!req.params || Object.keys(req.params).length === 0) {
      return res.status(400).json({ error: "Invalid parameter" });
    }

    for (const field of requiredFields) {
      const value = req.params[field];

      if (value === undefined || value === null) {
        return res.status(400).json({ error: `Missing or empty field: ${field}` });
      }

      if (typeof value === "string" && value.trim().length === 0) {
        return res.status(400).json({ error: `Empty field: ${field}` });
      }

      const numberValue = Number(value);
      if (!Number.isInteger(numberValue)) {
        return res.status(400).json({
          error: `Invalid numeric parameter: ${field}`,
        });
      }
    }

    next();
  };
