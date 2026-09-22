import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET'] || 'autocheck-super-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] || '2h';

export interface TokenPayload {
  userId: string;
  email: string;
}

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    if (!password || password.trim().length === 0) {
      throw new Error('Password cannot be empty');
    }
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) {
      return false;
    }
    return bcrypt.compare(password, hash);
  }

  generateToken(payload: TokenPayload): string {
    if (!payload.userId || !payload.email) {
      throw new Error('Invalid payload for token generation');
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
  }

  verifyToken(token: string): TokenPayload {
    if (!token) {
      throw new Error('Token is required');
    }
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    if (!decoded.userId || !decoded.email) {
      throw new Error('Invalid token payload');
    }
    return {
      userId: decoded.userId,
      email: decoded.email
    };
  }
}

export const authService = new AuthService();
