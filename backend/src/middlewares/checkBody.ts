import type { Request, Response, NextFunction } from "express";

export const checkBody = (requiredFields: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {

      if (!req.body || Object.keys(req.body).length === 0) return res
                            .status(400)
                            .json({ error: `Invalid parameter` });

      for(const field of requiredFields){
        if(req.body[field]===undefined || req.body[field] === "")
          return res.status(400).json({error:`Missing or empty field: ${field}`})
      }
    
    next();
  };
