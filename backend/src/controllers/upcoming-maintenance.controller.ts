import { Response } from 'express';
import { createUpcomingMaintenanceSchema, updateUpcomingMaintenanceSchema } from '../models/upcoming-maintenance.schema.js';
import { createProblemDetails } from '../models/problem-details.js';
import { upcomingMaintenanceService } from '../services/upcoming-maintenance.service.js';
import { AuthenticatedRequest } from '../middlewares/authMiddleware.js';

export class UpcomingMaintenanceController {
  async listByVehicle(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    const vehicleId = req.params.vehicleId as string;

    try {
      const result = await upcomingMaintenanceService.listByVehicle(vehicleId, userId);
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para acessar as previsões deste veículo.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao listar previsões.', req.originalUrl);
        res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
      }
    }
  }

  async listByUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    try {
      const result = await upcomingMaintenanceService.listByUser(userId);
      res.status(200).json(result);
    } catch {
      const problem = createProblemDetails(500, 'Erro interno', 'Erro ao listar previsões do usuário.', req.originalUrl);
      res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
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
      const maintenance = await upcomingMaintenanceService.getById(id, userId);
      res.status(200).json(maintenance);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Previsão não encontrada.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para acessar esta previsão.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao buscar previsão.', req.originalUrl);
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

    const parseResult = createUpcomingMaintenanceSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const problem = createProblemDetails(
        400,
        'Erro de validação',
        'Os dados informados para cadastro da previsão são inválidos.',
        req.originalUrl,
        'https://autocheck.app/problems/validation-error',
        fieldErrors as Record<string, string[]>
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    try {
      const maintenance = await upcomingMaintenanceService.create(vehicleId, userId, parseResult.data);
      res.status(201).json(maintenance);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para adicionar previsão neste veículo.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message.startsWith('VALIDATION_ERROR')) {
        const problem = createProblemDetails(400, 'Erro de validação', error.message.replace('VALIDATION_ERROR: ', ''), req.originalUrl);
        res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao criar previsão.', req.originalUrl);
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

    const parseResult = updateUpcomingMaintenanceSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const problem = createProblemDetails(
        400,
        'Erro de validação',
        'Os dados informados para atualização da previsão são inválidos.',
        req.originalUrl,
        'https://autocheck.app/problems/validation-error',
        fieldErrors as Record<string, string[]>
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    try {
      const maintenance = await upcomingMaintenanceService.update(id, userId, parseResult.data);
      res.status(200).json(maintenance);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Previsão não encontrada.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para alterar esta previsão.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message.startsWith('VALIDATION_ERROR')) {
        const problem = createProblemDetails(400, 'Erro de validação', error.message.replace('VALIDATION_ERROR: ', ''), req.originalUrl);
        res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao atualizar previsão.', req.originalUrl);
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
      await upcomingMaintenanceService.delete(id, userId);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'MAINTENANCE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Previsão não encontrada.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para excluir esta previsão.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao excluir previsão.', req.originalUrl);
        res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
      }
    }
  }
}

export const upcomingMaintenanceController = new UpcomingMaintenanceController();
