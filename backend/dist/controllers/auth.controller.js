"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_schema_js_1 = require("../models/auth.schema.js");
const problem_details_js_1 = require("../models/problem-details.js");
const auth_service_js_1 = require("../services/auth.service.js");
const user_repository_js_1 = require("../repositories/user.repository.js");
class AuthController {
    async register(req, res) {
        const parseResult = auth_schema_js_1.registerSchema.safeParse(req.body);
        if (!parseResult.success) {
            const fieldErrors = parseResult.error.flatten().fieldErrors;
            const problem = (0, problem_details_js_1.createProblemDetails)(400, 'Erro de validação', 'Os dados informados para cadastro são inválidos.', req.originalUrl || '/api/v1/auth/register', 'https://autocheck.app/problems/validation-error', fieldErrors);
            res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        const { name, email, password } = parseResult.data;
        const existingUser = await user_repository_js_1.userRepository.findByEmail(email);
        if (existingUser) {
            const problem = (0, problem_details_js_1.createProblemDetails)(400, 'E-mail já cadastrado', 'O e-mail informado já está em uso por outra conta.', req.originalUrl || '/api/v1/auth/register', 'https://autocheck.app/problems/duplicate-email');
            res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        const hashedPassword = await auth_service_js_1.authService.hashPassword(password);
        const user = await user_repository_js_1.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = auth_service_js_1.authService.generateToken({ userId: user.id, email: user.email });
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
    async login(req, res) {
        const parseResult = auth_schema_js_1.loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            const fieldErrors = parseResult.error.flatten().fieldErrors;
            const problem = (0, problem_details_js_1.createProblemDetails)(400, 'Erro de validação', 'Os dados informados para login são inválidos.', req.originalUrl || '/api/v1/auth/login', 'https://autocheck.app/problems/validation-error', fieldErrors);
            res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        const { email, password } = parseResult.data;
        const user = await user_repository_js_1.userRepository.findByEmail(email);
        if (!user) {
            const problem = (0, problem_details_js_1.createProblemDetails)(401, 'Credenciais inválidas', 'E-mail ou senha incorretos.', req.originalUrl || '/api/v1/auth/login', 'https://autocheck.app/problems/invalid-credentials');
            res.status(401).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        const isPasswordValid = await auth_service_js_1.authService.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            const problem = (0, problem_details_js_1.createProblemDetails)(401, 'Credenciais inválidas', 'E-mail ou senha incorretos.', req.originalUrl || '/api/v1/auth/login', 'https://autocheck.app/problems/invalid-credentials');
            res.status(401).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        const token = auth_service_js_1.authService.generateToken({ userId: user.id, email: user.email });
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
exports.AuthController = AuthController;
exports.authController = new AuthController();
