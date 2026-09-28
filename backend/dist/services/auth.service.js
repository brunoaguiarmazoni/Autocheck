"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env['JWT_SECRET'] || 'autocheck-super-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] || '2h';
class AuthService {
    async hashPassword(password) {
        if (!password || password.trim().length === 0) {
            throw new Error('Password cannot be empty');
        }
        const saltRounds = 10;
        return bcryptjs_1.default.hash(password, saltRounds);
    }
    async comparePasswords(password, hash) {
        if (!password || !hash) {
            return false;
        }
        return bcryptjs_1.default.compare(password, hash);
    }
    generateToken(payload) {
        if (!payload.userId || !payload.email) {
            throw new Error('Invalid payload for token generation');
        }
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    verifyToken(token) {
        if (!token) {
            throw new Error('Token is required');
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded.userId || !decoded.email) {
            throw new Error('Invalid token payload');
        }
        return {
            userId: decoded.userId,
            email: decoded.email
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
