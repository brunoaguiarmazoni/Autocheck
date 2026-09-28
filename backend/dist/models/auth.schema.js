"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
    email: zod_1.z.string().email('E-mail em formato inválido'),
    password: zod_1.z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('E-mail em formato inválido'),
    password: zod_1.z.string().min(1, 'A senha é obrigatória'),
});
