"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const auth_service_js_1 = require("../services/auth.service.js");
const problem_details_js_1 = require("../models/problem-details.js");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const problem = (0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Token de autenticação não fornecido ou em formato inválido.', req.originalUrl || req.url, 'https://autocheck.app/problems/unauthorized');
        res.status(401).setHeader('Content-Type', 'application/problem+json').json(problem);
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = auth_service_js_1.authService.verifyToken(token);
        req.user = payload;
        next();
    }
    catch {
        const problem = (0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Token de autenticação expirado ou inválido.', req.originalUrl || req.url, 'https://autocheck.app/problems/invalid-token');
        res.status(401).setHeader('Content-Type', 'application/problem+json').json(problem);
    }
}
