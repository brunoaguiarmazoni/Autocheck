import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../models/auth.schema.js';
import { createProblemDetails } from '../models/problem-details.js';
import { authService } from '../services/auth.service.js';
import { userRepository } from '../repositories/user.repository.js';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const problem = createProblemDetails(
        400,
        'Erro de validação',
        'Os dados informados para cadastro são inválidos.',
        req.originalUrl || '/api/v1/auth/register',
        'https://autocheck.app/problems/validation-error',
        fieldErrors as Record<string, string[]>
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    const { name, email, password } = parseResult.data;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      const problem = createProblemDetails(
        400,
        'E-mail já cadastrado',
        'O e-mail informado já está em uso por outra conta.',
        req.originalUrl || '/api/v1/auth/register',
        'https://autocheck.app/problems/duplicate-email'
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    const hashedPassword = await authService.hashPassword(password);
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = authService.generateToken({ userId: user.id, email: user.email });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  }

  async login(req: Request, res: Response): Promise<void> {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const problem = createProblemDetails(
        400,
        'Erro de validação',
        'Os dados informados para login são inválidos.',
        req.originalUrl || '/api/v1/auth/login',
        'https://autocheck.app/problems/validation-error',
        fieldErrors as Record<string, string[]>
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    const { email, password } = parseResult.data;

    const user = await userRepository.findByEmail(email);
    if (!user) {
      const problem = createProblemDetails(
        401,
        'Credenciais inválidas',
        'E-mail ou senha incorretos.',
        req.originalUrl || '/api/v1/auth/login',
        'https://autocheck.app/problems/invalid-credentials'
      );
      res.status(401).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    const isPasswordValid = await authService.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      const problem = createProblemDetails(
        401,
        'Credenciais inválidas',
        'E-mail ou senha incorretos.',
        req.originalUrl || '/api/v1/auth/login',
        'https://autocheck.app/problems/invalid-credentials'
      );
      res.status(401).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    const token = authService.generateToken({ userId: user.id, email: user.email });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}

export const authController = new AuthController();
