import { describe, it, expect } from 'vitest';
import { authService } from '../../src/services/auth.service.js';

describe('AuthService (Unit Tests)', () => {
  describe('hashPassword & comparePasswords', () => {
    it('should hash a password and verify it correctly (Happy Path)', async () => {
      const plainPassword = 'securePassword123';
      const hash = await authService.hashPassword(plainPassword);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(plainPassword);

      const isValid = await authService.comparePasswords(plainPassword, hash);
      expect(isValid).toBe(true);
    });

    it('should return false when comparing incorrect password (Sad Path)', async () => {
      const plainPassword = 'securePassword123';
      const hash = await authService.hashPassword(plainPassword);

      const isValid = await authService.comparePasswords('wrongPassword', hash);
      expect(isValid).toBe(false);
    });

    it('should throw an error for empty password hashing (Edge Case)', async () => {
      await expect(authService.hashPassword('')).rejects.toThrow('Password cannot be empty');
    });

    it('should return false for empty inputs in comparePasswords (Edge Case)', async () => {
      const isValid = await authService.comparePasswords('', '');
      expect(isValid).toBe(false);
    });
  });

  describe('generateToken & verifyToken', () => {
    it('should generate a valid JWT token and verify payload (Happy Path)', () => {
      const payload = { userId: 'user-uuid-123', email: 'user@example.com' };
      const token = authService.generateToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      const decoded = authService.verifyToken(token);
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
    });

    it('should throw error when verifying an invalid or corrupted token (Sad Path)', () => {
      expect(() => authService.verifyToken('invalid-jwt-token')).toThrow();
    });

    it('should throw error when generating token with incomplete payload (Edge Case)', () => {
      expect(() => authService.generateToken({ userId: '', email: '' })).toThrow('Invalid payload for token generation');
    });

    it('should throw error when verifying empty token (Edge Case)', () => {
      expect(() => authService.verifyToken('')).toThrow('Token is required');
    });
  });
});
