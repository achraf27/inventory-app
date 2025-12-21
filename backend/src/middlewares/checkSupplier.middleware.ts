import type { Request, Response, NextFunction } from "express";

export const checkSupplier = 
  (req: Request, res: Response, next: NextFunction) => {

    const {contact_name,mail,phone,address} = req.body;
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