import { Response } from 'express';
import { createMaintenanceSchema, updateMaintenanceSchema } from '../models/maintenance.schema.js';
import { createProblemDetails } from '../models/problem-details.js';
import { maintenanceService } from '../services/maintenance.service.js';
import { AuthenticatedRequest } from '../middlewares/authMiddleware.js';

export class MaintenanceController {
  async listByVehicle(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    const vehicleId = req.params.vehicleId as string;

    try {
      const result = await maintenanceService.listByVehicle(vehicleId, userId);
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para acessar as manutenções deste veículo.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao listar manutenções.', req.originalUrl);
        res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
      }
    }
  }

  async getById(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    const id = req.params.id as string;

    try {
      const maintenance = await maintenanceService.getById(id, userId);
      res.status(200).json(maintenance);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Manutenção não encontrada.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para acessar esta manutenção.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao buscar manutenção.', req.originalUrl);
        res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
      }
    }
  }

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    const vehicleId = req.params.vehicleId as string;

    const parseResult = createMaintenanceSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const problem = createProblemDetails(
        400,
        'Erro de validação',
        'Os dados informados para cadastro da manutenção são inválidos.',
        req.originalUrl,
        'https://autocheck.app/problems/validation-error',
        fieldErrors as Record<string, string[]>
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    try {
      const maintenance = await maintenanceService.create(vehicleId, userId, parseResult.data);
      res.status(201).json(maintenance);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para adicionar manutenção neste veículo.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao criar manutenção.', req.originalUrl);
        res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
      }
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    const id = req.params.id as string;

    const parseResult = updateMaintenanceSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const problem = createProblemDetails(
        400,
        'Erro de validação',
        'Os dados informados para atualização da manutenção são inválidos.',
        req.originalUrl,
        'https://autocheck.app/problems/validation-error',
        fieldErrors as Record<string, string[]>
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    try {
      const maintenance = await maintenanceService.update(id, userId, parseResult.data);
      res.status(200).json(maintenance);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Manutenção não encontrada.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para alterar esta manutenção.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao atualizar manutenção.', req.originalUrl);
        res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
      }
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    const id = req.params.id as string;

    try {
      await maintenanceService.delete(id, userId);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Manutenção não encontrada.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para excluir esta manutenção.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao excluir manutenção.', req.originalUrl);
        res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
      }
    }
  }
}

export const maintenanceController = new MaintenanceController();
