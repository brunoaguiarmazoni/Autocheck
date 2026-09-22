import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import { userRepository } from '../../src/repositories/user.repository.js';
import { authService } from '../../src/services/auth.service.js';

describe('Auth Routes (Integration Tests)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully and return 201 (Happy Path)', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(userRepository, 'create').mockResolvedValue({
        id: 'user-uuid-1',
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Maria Silva',
          email: 'maria@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(201);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('maria@example.com');
    });

    it('should return HTTP 400 Problem Details for invalid payload (Sad Path)', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'A',
          email: 'invalid-email',
          password: '123',
        });

      expect(res.status).toBe(400);
      expect(res.headers['content-type']).toContain('application/problem+json');
      expect(res.body.title).toBe('Erro de validação');
      expect(res.body.errors).toBeDefined();
    });

    it('should return HTTP 400 Problem Details when email is already registered (Sad Path)', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
        id: 'existing-id',
        name: 'Existente',
        email: 'maria@example.com',
        password: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Maria Silva',
          email: 'maria@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(400);
      expect(res.body.title).toBe('E-mail já cadastrado');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should authenticate user successfully and return JWT (Happy Path)', async () => {
      const hashedPassword = await authService.hashPassword('password123');
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
        id: 'user-uuid-1',
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'maria@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('maria@example.com');
    });

    it('should return HTTP 401 Problem Details for incorrect password (Sad Path)', async () => {
      const hashedPassword = await authService.hashPassword('password123');
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
        id: 'user-uuid-1',
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'maria@example.com',
          password: 'wrongPassword',
        });

      expect(res.status).toBe(401);
      expect(res.body.title).toBe('Credenciais inválidas');
    });

    it('should return HTTP 401 Problem Details for non-existent user (Sad Path)', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(401);
      expect(res.body.title).toBe('Credenciais inválidas');
    });
  });

  describe('GET /api/v1/auth/me (authMiddleware tests)', () => {
    it('should allow access with valid bearer token (Happy Path)', async () => {
      const token = authService.generateToken({ userId: 'user-123', email: 'user@example.com' });

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.user.userId).toBe('user-123');
    });

    it('should deny access without Authorization header (Sad Path)', async () => {
      const res = await request(app).get('/api/v1/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.title).toBe('Não autorizado');
    });

    it('should deny access with invalid bearer token (Sad Path)', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token-123');

      expect(res.status).toBe(401);
      expect(res.body.title).toBe('Não autorizado');
    });
  });
});
