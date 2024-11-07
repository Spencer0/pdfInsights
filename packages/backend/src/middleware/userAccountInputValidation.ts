import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, username, password } = req.body;

  if (!email || !email.includes('@')) {
     res.status(400).json({ error: 'Valid email is required' });
     return;
  }

  if (!username || username.length < 3) {
     res.status(400).json({ error: 'Username must be at least 3 characters' });
     return;
  }

  if (!password || password.length < 8) {
      res.status(400).json({ 
      error: 'Password must be at least 8 characters' 
    });
    return;
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ 
      error: 'Email and password are required' 
    });
    return;
  }

  next();
};