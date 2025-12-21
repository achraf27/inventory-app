import type { Request, Response, NextFunction } from "express";

export const checkParams = (requiredFields: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {

      if (!req.params || Object.keys(req.params).length === 0) return res
                            .status(400)
                            .json({ error: `Invalid parameter` });

      for(const field of requiredFields){

        const value = req.params[field];
        if(value === undefined || value === null)
          return res.status(400).json({error:`Missing or empty field: ${field}`})

        if(typeof value === "string" && value.trim().length === 0)
          return res.status(400).json({error:`empty field: ${field}`})

         const numberValue = Number(value);
            if (!Number.isInteger(numberValue)) 
                return res.status(400).json({
                error: `Invalid numeric parameter: ${field}`,
                });
      

      }

    
    next();
  };
