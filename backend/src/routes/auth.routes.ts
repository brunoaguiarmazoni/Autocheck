import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware, AuthenticatedRequest } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Mock protected route for middleware validation tests
router.get('/me', authMiddleware, (req: AuthenticatedRequest, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
