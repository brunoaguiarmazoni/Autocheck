import { Response } from 'express';
import { createVehicleSchema, updateVehicleSchema } from '../models/vehicle.schema.js';
import { createProblemDetails } from '../models/problem-details.js';
import { vehicleService } from '../services/vehicle.service.js';
import { AuthenticatedRequest } from '../middlewares/authMiddleware.js';

export class VehicleController {
  async list(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    try {
      const vehicles = await vehicleService.listByUser(userId);
      res.status(200).json(vehicles);
    } catch {
      const problem = createProblemDetails(500, 'Erro interno', 'Erro ao listar veículos.', req.originalUrl);
      res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    const { id } = req.params;

    try {
      const vehicle = await vehicleService.getById(id, userId);
      res.status(200).json(vehicle);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para acessar este veículo.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao buscar veículo.', req.originalUrl);
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

    const parseResult = createVehicleSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const problem = createProblemDetails(
        400,
        'Erro de validação',
        'Os dados informados para cadastro do veículo são inválidos.',
        req.originalUrl,
        'https://autocheck.app/problems/validation-error',
        fieldErrors as Record<string, string[]>
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    try {
      const vehicle = await vehicleService.create(userId, parseResult.data);
      res.status(201).json(vehicle);
    } catch {
      const problem = createProblemDetails(500, 'Erro interno', 'Erro ao criar veículo.', req.originalUrl);
      res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createProblemDetails(401, 'Não autorizado', 'Usuário não autenticado.', req.originalUrl));
      return;
    }

    const { id } = req.params;

    const parseResult = updateVehicleSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const problem = createProblemDetails(
        400,
        'Erro de validação',
        'Os dados informados para atualização do veículo são inválidos.',
        req.originalUrl,
        'https://autocheck.app/problems/validation-error',
        fieldErrors as Record<string, string[]>
      );
      res.status(400).setHeader('Content-Type', 'application/problem+json').json(problem);
      return;
    }

    try {
      const vehicle = await vehicleService.update(id, userId, parseResult.data);
      res.status(200).json(vehicle);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para alterar este veículo.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao atualizar veículo.', req.originalUrl);
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

    const { id } = req.params;

    try {
      await vehicleService.delete(id, userId);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'VEHICLE_NOT_FOUND') {
        const problem = createProblemDetails(404, 'Não encontrado', 'Veículo não encontrado.', req.originalUrl);
        res.status(404).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else if (error instanceof Error && error.message === 'FORBIDDEN_ACCESS') {
        const problem = createProblemDetails(403, 'Acesso negado', 'Você não tem permissão para excluir este veículo.', req.originalUrl);
        res.status(403).setHeader('Content-Type', 'application/problem+json').json(problem);
      } else {
        const problem = createProblemDetails(500, 'Erro interno', 'Erro ao excluir veículo.', req.originalUrl);
        res.status(500).setHeader('Content-Type', 'application/problem+json').json(problem);
      }
    }
  }
}

export const vehicleController = new VehicleController();
