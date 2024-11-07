// src/routes/userRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { validateRegistration, validateLogin } from '../middleware/userAccountInputValidation';

const router = Router();

router.post(
    '/register',
    validateRegistration,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { email, username, password } = req.body;
        const user = await userService.createUser({ email, username, password });
        res.status(201).json(user);
        return; // Explicitly return void after sending the response
      } catch (error) {
        if (error instanceof Error && error.message === 'USER_EXISTS') {
          res.status(409).json({ error: 'User already exists' });
          return; // Explicitly return void after sending the response
        }
        next(error); // Pass any other errors to the error handler middleware
      }
    }
  );

router.post(
  '/login',
  validateLogin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await userService.authenticateUser(email, password);
      
      if (!user) {
         res.status(401).json({ error: 'Invalid credentials' });
         return;
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/profile/:email',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await userService.getUserProfile(req.params.email);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
    '/getTestUser',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const user = await userService.getTestUserProfile();
        res.json(user);
      } catch (error) {
        next(error);
      }
    }
  );

export const userRoutes = router;