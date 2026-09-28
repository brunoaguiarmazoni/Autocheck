import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service';

export class DashboardController {
  async getSummary(req: Request, res: Response) {
    try {
      const { vehicleId } = req.params;
      const userId = (req as unknown as { user?: { userId: string } }).user?.userId;

      if (!userId) {
        return res.status(401).json({
          type: 'https://example.com/problems/unauthorized',
          title: 'Não autorizado',
          status: 401,
          detail: 'Usuário não autenticado',
        });
      }

      const summary = await dashboardService.getSummary(vehicleId, userId);
      return res.status(200).json(summary);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        return res.status(404).json({
          type: 'https://example.com/problems/not-found',
          title: 'Não encontrado',
          status: 404,
          detail: (error as Error).message,
        });
      }

      console.error('Error fetching dashboard summary:', error);
      return res.status(500).json({
        type: 'https://example.com/problems/internal-server-error',
        title: 'Erro interno do servidor',
        status: 500,
        detail: 'Ocorreu um erro inesperado ao processar a requisição',
      });
    }
  }
}

export const dashboardController = new DashboardController();
