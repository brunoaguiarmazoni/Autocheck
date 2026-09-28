"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = exports.VehicleController = void 0;
const vehicle_schema_js_1 = require("../models/vehicle.schema.js");
const problem_details_js_1 = require("../models/problem-details.js");
const vehicle_service_js_1 = require("../services/vehicle.service.js");
class VehicleController {
    async list(req, res) {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json((0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
            return;
        }
        try {
            const vehicles = await vehicle_service_js_1.vehicleService.listByUser(userId);
            res.status(200).json(vehicles);
        }
        catch {
            const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao listar veículos.', req.originalUrl);
            res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
        }
    }
    async getById(req, res) {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json((0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
            return;
        }
        const id = req.params.id;
        try {
            const vehicle = await vehicle_service_js_1.vehicleService.getById(id, userId);
            res.status(200).json(vehicle);
        }
        catch (error) {
            if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
                const problem = (0, problem_details_js_1.createProblemDetails)(403, 'Acesso negado', 'Você não tem permissão para acessar este veículo.', req.originalUrl);
                res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else {
                const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao buscar veículo.', req.originalUrl);
                res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
        }
    }
    async create(req, res) {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json((0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
            return;
        }
        const parseResult = vehicle_schema_js_1.createVehicleSchema.safeParse(req.body);
        if (!parseResult.success) {
            const fieldErrors = parseResult.error.flatten().fieldErrors;
            const problem = (0, problem_details_js_1.createProblemDetails)(400, 'Erro de validação', 'Os dados informados para cadastro do veículo são inválidos.', req.originalUrl, 'https://autocheck.app/problems/validation-error', fieldErrors);
            res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        try {
            const vehicle = await vehicle_service_js_1.vehicleService.create(userId, parseResult.data);
            res.status(201).json(vehicle);
        }
        catch {
            const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao criar veículo.', req.originalUrl);
            res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
        }
    }
    async update(req, res) {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json((0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
            return;
        }
        const id = req.params.id;
        const parseResult = vehicle_schema_js_1.updateVehicleSchema.safeParse(req.body);
        if (!parseResult.success) {
            const fieldErrors = parseResult.error.flatten().fieldErrors;
            const problem = (0, problem_details_js_1.createProblemDetails)(400, 'Erro de validação', 'Os dados informados para atualização do veículo são inválidos.', req.originalUrl, 'https://autocheck.app/problems/validation-error', fieldErrors);
            res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        try {
            const vehicle = await vehicle_service_js_1.vehicleService.update(id, userId, parseResult.data);
            res.status(200).json(vehicle);
        }
        catch (error) {
            if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
                const problem = (0, problem_details_js_1.createProblemDetails)(403, 'Acesso negado', 'Você não tem permissão para alterar este veículo.', req.originalUrl);
                res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else {
                const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao atualizar veículo.', req.originalUrl);
                res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
        }
    }
    async delete(req, res) {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json((0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
            return;
        }
        const id = req.params.id;
        try {
            await vehicle_service_js_1.vehicleService.delete(id, userId);
            res.status(204).send();
        }
        catch (error) {
            if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
                const problem = (0, problem_details_js_1.createProblemDetails)(403, 'Acesso negado', 'Você não tem permissão para excluir este veículo.', req.originalUrl);
                res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else {
                const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao excluir veículo.', req.originalUrl);
                res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
        }
    }
}
exports.VehicleController = VehicleController;
exports.vehicleController = new VehicleController();
