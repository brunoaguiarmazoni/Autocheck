import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service.js';
import { createProblemDetails } from '../models/problem-details.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const problem = createProblemDetails(
      401,
      'Não autorizado',
      'Token de autenticação não fornecido ou em formato inválido.',
      req.originalUrl || req.url,
      'https://autocheck.app/problems/unauthorized'
    );
    res.status(401).setHeader('Content-Type', 'application/problem+json').json(problem);
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = authService.verifyToken(token);
    req.user = payload;
    next();
  } catch {
    const problem = createProblemDetails(
      401,
      'Não autorizado',
      'Token de autenticação expirado ou inválido.',
      req.originalUrl || req.url,
      'https://autocheck.app/problems/invalid-token'
    );
    res.status(401).setHeader('Content-Type', 'application/problem+json').json(problem);
  }
}
