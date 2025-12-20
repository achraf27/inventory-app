import type { Request, Response, NextFunction } from "express";

export const checkBody = (requiredFields: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {

      if (!req.body || Object.keys(req.body).length === 0) return res
                            .status(400)
                            .json({ error: `Invalid parameter` });

      for(const field of requiredFields){
        const value = req.body[field]
        if(value===undefined || value === null)
          return res.status(400).json({error:`Missing field: ${field}`})
          

        if(typeof value === "string" && value.trim().length === 0)
          return res.status(400).json({error:`empty field: ${field}`})
          

        
      }
    
    next();
  };
