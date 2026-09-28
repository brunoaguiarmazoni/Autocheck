import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DashboardService } from '../../src/services/dashboard.service';
import { DashboardRepository } from '../../src/repositories/dashboard.repository';

describe('DashboardService', () => {
  let dashboardService: DashboardService;
  let mockDashboardRepo: any;

  beforeEach(() => {
    mockDashboardRepo = {
      getVehicleSummary: vi.fn(),
    };
    dashboardService = new DashboardService(mockDashboardRepo as unknown as DashboardRepository);
  });

  it('should return the summary for a valid vehicle (Happy Path)', async () => {
    const mockSummary = {
      vehicle: {
        id: 'vehicle-123',
        brand: 'Honda',
        model: 'Civic',
        year: 2020,
        licensePlate: 'ABC-1234',
        currentMileage: 50000,
      },
      recentMaintenances: [
        { id: 'm1', date: new Date(), type: 'Oil Change', cost: 200, description: null }
      ],
      upcomingMaintenances: [],
      totalExpenses: 200,
    };

    mockDashboardRepo.getVehicleSummary.mockResolvedValue(mockSummary);

    const result = await dashboardService.getSummary('vehicle-123', 'user-123');

    expect(mockDashboardRepo.getVehicleSummary).toHaveBeenCalledWith('vehicle-123', 'user-123');
    expect(result).toEqual(mockSummary);
  });

  it('should return a summary with zero expenses and empty lists if vehicle has no records (Sad Path)', async () => {
    const mockSummary = {
      vehicle: {
        id: 'vehicle-123',
        brand: 'Honda',
        model: 'Civic',
        year: 2020,
        licensePlate: 'ABC-1234',
        currentMileage: 50000,
      },
      recentMaintenances: [],
      upcomingMaintenances: [],
      totalExpenses: 0,
    };

    mockDashboardRepo.getVehicleSummary.mockResolvedValue(mockSummary);

    const result = await dashboardService.getSummary('vehicle-123', 'user-123');

    expect(result.recentMaintenances).toHaveLength(0);
    expect(result.totalExpenses).toBe(0);
  });

  it('should throw a 404 error if vehicle does not exist or does not belong to user (Edge Case)', async () => {
    mockDashboardRepo.getVehicleSummary.mockResolvedValue(null);

    await expect(dashboardService.getSummary('invalid-id', 'user-123'))
      .rejects
      .toThrow('Veículo não encontrado ou não pertence ao usuário');
  });
});
