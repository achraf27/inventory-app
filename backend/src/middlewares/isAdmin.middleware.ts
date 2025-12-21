import type { Request, Response, NextFunction } from "express";


const isAdmin = (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      try {

        if(!user) return res.status(401).json({error: "Unauthorized"})

        if(user.role !== "Admin") return res.status(403).json({error :"Forbidden admin only"});
            
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};


export default isAdmin