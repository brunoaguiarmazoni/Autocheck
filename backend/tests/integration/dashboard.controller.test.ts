import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import app from '../../src/app.js';
import { dashboardService } from '../../src/services/dashboard.service.js';
import { authService } from '../../src/services/auth.service.js';

describe('DashboardController (Integration Tests)', () => {
  const mockToken = authService.generateToken({ userId: 'user-123', email: 'user@example.com' });
  const otherToken = authService.generateToken({ userId: 'other-user', email: 'other@example.com' });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/vehicles/:vehicleId/summary', () => {
    it('should return 200 with the aggregated data for the authenticated user (Happy Path)', async () => {
      const mockSummary = {
        vehicle: {
          id: 'vehicle-1',
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

      vi.spyOn(dashboardService, 'getSummary').mockResolvedValue(mockSummary);

      const res = await request(app)
        .get('/api/v1/vehicles/vehicle-1/summary')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body.vehicle.brand).toBe('Honda');
    });

    it('should deny access if not authenticated (Sad Path)', async () => {
      const res = await request(app).get('/api/v1/vehicles/vehicle-1/summary');
      expect(res.status).toBe(401);
    });

    it('should return 404 if vehicle not found or does not belong to user (Edge Case)', async () => {
      const error = new Error('Veículo não encontrado ou não pertence ao usuário');
      (error as any).status = 404;
      vi.spyOn(dashboardService, 'getSummary').mockRejectedValue(error);

      const res = await request(app)
        .get('/api/v1/vehicles/vehicle-1/summary')
        .set('Authorization', `Bearer ${otherToken}`);

      expect(res.status).toBe(404);
      expect(res.body.title).toBe('Não encontrado');
    });
  });
});
