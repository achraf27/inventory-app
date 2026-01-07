import type { Request, Response, NextFunction } from "express";

/**
 * Middleware pour valider les champs d'un fournisseur (`supplier`) dans `req.body`.
 *
 * Vérifie que les champs `contact_name`, `mail`, `phone` et `address` :
 * - sont définis (`!== undefined` et `!== null`),
 * - ne sont pas des chaînes vides ou composées uniquement d'espaces.
 *
 * Retourne une réponse 400 si l'un des champs est invalide.
 *
 * Usage :
 * ```ts
 * app.post("/supplier", checkSupplier, supplierController.create);
 * ```
 *
 * @param req - Objet Request d'Express
 * @param res - Objet Response d'Express
 * @param next - Fonction NextFunction pour passer au middleware suivant
 */
export const checkSupplier = (req: Request, res: Response, next: NextFunction) => {
  const { contact_name, mail, phone, address } = req.body;
  const updates = { contact_name, mail, phone, address };

  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined) {
      return res.status(400).json({ error: `${key} is either null or undefined` });
    }

    if (typeof value === "string" && value.trim() === "") {
      return res.status(400).json({ error: `${key} is empty` });
    }
  }

  next();
};
