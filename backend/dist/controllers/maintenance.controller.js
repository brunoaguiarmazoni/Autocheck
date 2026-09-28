"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceController = exports.MaintenanceController = void 0;
const maintenance_schema_js_1 = require("../models/maintenance.schema.js");
const problem_details_js_1 = require("../models/problem-details.js");
const maintenance_service_js_1 = require("../services/maintenance.service.js");
class MaintenanceController {
    async listByVehicle(req, res) {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json((0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
            return;
        }
        const vehicleId = req.params.vehicleId;
        try {
            const result = await maintenance_service_js_1.maintenanceService.listByVehicle(vehicleId, userId);
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
                const problem = (0, problem_details_js_1.createProblemDetails)(403, 'Acesso negado', 'Você não tem permissão para acessar as manutenções deste veículo.', req.originalUrl);
                res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else {
                const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao listar manutenções.', req.originalUrl);
                res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
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
            const maintenance = await maintenance_service_js_1.maintenanceService.getById(id, userId);
            res.status(200).json(maintenance);
        }
        catch (error) {
            if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Manutenção não encontrada.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
                const problem = (0, problem_details_js_1.createProblemDetails)(403, 'Acesso negado', 'Você não tem permissão para acessar esta manutenção.', req.originalUrl);
                res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else {
                const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao buscar manutenção.', req.originalUrl);
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
        const vehicleId = req.params.vehicleId;
        const parseResult = maintenance_schema_js_1.createMaintenanceSchema.safeParse(req.body);
        if (!parseResult.success) {
            const fieldErrors = parseResult.error.flatten().fieldErrors;
            const problem = (0, problem_details_js_1.createProblemDetails)(400, 'Erro de validação', 'Os dados informados para cadastro da manutenção são inválidos.', req.originalUrl, 'https://autocheck.app/problems/validation-error', fieldErrors);
            res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        try {
            const maintenance = await maintenance_service_js_1.maintenanceService.create(vehicleId, userId, parseResult.data);
            res.status(201).json(maintenance);
        }
        catch (error) {
            if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
                const problem = (0, problem_details_js_1.createProblemDetails)(403, 'Acesso negado', 'Você não tem permissão para adicionar manutenção neste veículo.', req.originalUrl);
                res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else {
                const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao criar manutenção.', req.originalUrl);
                res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
        }
    }
    async update(req, res) {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json((0, problem_details_js_1.createProblemDetails)(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
            return;
        }
        const id = req.params.id;
        const parseResult = maintenance_schema_js_1.updateMaintenanceSchema.safeParse(req.body);
        if (!parseResult.success) {
            const fieldErrors = parseResult.error.flatten().fieldErrors;
            const problem = (0, problem_details_js_1.createProblemDetails)(400, 'Erro de validação', 'Os dados informados para atualização da manutenção são inválidos.', req.originalUrl, 'https://autocheck.app/problems/validation-error', fieldErrors);
            res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
            return;
        }
        try {
            const maintenance = await maintenance_service_js_1.maintenanceService.update(id, userId, parseResult.data);
            res.status(200).json(maintenance);
        }
        catch (error) {
            if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Manutenção não encontrada.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
                const problem = (0, problem_details_js_1.createProblemDetails)(403, 'Acesso negado', 'Você não tem permissão para alterar esta manutenção.', req.originalUrl);
                res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else {
                const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao atualizar manutenção.', req.originalUrl);
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
            await maintenance_service_js_1.maintenanceService.delete(id, userId);
            res.status(204).send();
        }
        catch (error) {
            if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Manutenção não encontrada.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
                const problem = (0, problem_details_js_1.createProblemDetails)(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
                res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
                const problem = (0, problem_details_js_1.createProblemDetails)(403, 'Acesso negado', 'Você não tem permissão para excluir esta manutenção.', req.originalUrl);
                res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
            else {
                const problem = (0, problem_details_js_1.createProblemDetails)(500, 'Erro interno', 'Erro ao excluir manutenção.', req.originalUrl);
                res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
            }
        }
    }
}
exports.MaintenanceController = MaintenanceController;
exports.maintenanceController = new MaintenanceController();
