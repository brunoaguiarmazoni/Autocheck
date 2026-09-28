import { DashboardRepository, dashboardRepository } from '../repositories/dashboard.repository';

export class DashboardService {
  constructor(private repo: DashboardRepository = dashboardRepository) {}

  async getSummary(vehicleId: string, userId: string) {
    const summary = await this.repo.getVehicleSummary(vehicleId, userId);
    
    if (!summary) {
      const error = new Error('Veículo não encontrado ou não pertence ao usuário');
      Object.assign(error, { status: 404 });
      throw error;
    }
    
    return summary;
  }
}

export const dashboardService = new DashboardService();
