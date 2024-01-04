import { Request, Response, NextFunction } from 'express';

const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/all') {
    const providedKey = req.headers.authorization;

    if (!providedKey || providedKey !== process.env.AUTH_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  next();
};

export default authorizationMiddleware;
