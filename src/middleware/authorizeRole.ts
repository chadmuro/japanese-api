import { Request, Response, NextFunction } from 'express';

export function authorizeRole(role: 'admin' | 'basic') {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers);
    if (req.headers.role !== role) {
      return res.status(401).send({ message: 'Not allowed!' });
    }
    next();
  };
}
