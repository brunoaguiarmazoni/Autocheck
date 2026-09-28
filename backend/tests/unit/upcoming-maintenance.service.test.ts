import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UpcomingMaintenanceService } from '../../src/services/upcoming-maintenance.service';
import { upcomingMaintenanceRepository } from '../../src/repositories/upcoming-maintenance.repository';
import { vehicleRepository } from '../../src/repositories/vehicle.repository';

vi.mock('../../src/repositories/upcoming-maintenance.repository');
vi.mock('../../src/repositories/vehicle.repository');

describe('UpcomingMaintenanceService', () => {
  let service: UpcomingMaintenanceService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new UpcomingMaintenanceService();
  });

  describe('create', () => {
    it('should create an upcoming maintenance (Happy Path - targetDate)', async () => {
      const mockVehicle = { id: 'v1', userId: 'u1' };
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle as any);
      
      const mockData = { description: 'Test', targetDate: '2027-10-10T10:00:00.000Z' };
      vi.mocked(upcomingMaintenanceRepository.create).mockResolvedValue({ id: '1', ...mockData } as any);

      const result = await service.create('v1', 'u1', mockData);

      expect(result.id).toBe('1');
      expect(upcomingMaintenanceRepository.create).toHaveBeenCalledWith({
        vehicleId: 'v1',
        description: 'Test',
        targetDate: new Date('2027-10-10T10:00:00.000Z'),
        targetMileage: null,
      });
    });

    it('should create an upcoming maintenance (Happy Path - targetMileage)', async () => {
      const mockVehicle = { id: 'v1', userId: 'u1' };
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle as any);
      
      const mockData = { description: 'Test', targetMileage: 10000 };
      vi.mocked(upcomingMaintenanceRepository.create).mockResolvedValue({ id: '1', ...mockData } as any);

      const result = await service.create('v1', 'u1', mockData);

      expect(result.id).toBe('1');
      expect(upcomingMaintenanceRepository.create).toHaveBeenCalledWith({
        vehicleId: 'v1',
        description: 'Test',
        targetDate: null,
        targetMileage: 10000,
      });
    });

    it('should throw an error if vehicle does not exist (Sad Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(null);

      await expect(service.create('v1', 'u1', { description: 'Test', targetMileage: 10000 }))
        .rejects
        .toThrow('VEHICLE_NOT_FOUND');
    });

    it('should throw an error if vehicle belongs to another user (Sad Path - IDOR)', async () => {
      const mockVehicle = { id: 'v1', userId: 'u2' };
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle as any);

      await expect(service.create('v1', 'u1', { description: 'Test', targetMileage: 10000 }))
        .rejects
        .toThrow('FORBIDDEN_ACCESS');
    });

    it('should throw an error if neither targetDate nor targetMileage are provided (Edge Case)', async () => {
      const mockVehicle = { id: 'v1', userId: 'u1' };
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle as any);

      await expect(service.create('v1', 'u1', { description: 'Test' }))
        .rejects
        .toThrow('VALIDATION_ERROR: Must provide targetDate or targetMileage');
    });
  });

  describe('update', () => {
    it('should update an upcoming maintenance (Happy Path)', async () => {
      const mockVehicle = { id: 'v1', userId: 'u1' };
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle as any);
      
      const mockMaintenance = { id: '1', vehicleId: 'v1', targetDate: null, targetMileage: 10000 };
      vi.mocked(upcomingMaintenanceRepository.findById).mockResolvedValue(mockMaintenance as any);

      vi.mocked(upcomingMaintenanceRepository.update).mockResolvedValue({ ...mockMaintenance, targetMileage: 20000 } as any);

      const result = await service.update('1', 'u1', { targetMileage: 20000 });

      expect(result.targetMileage).toBe(20000);
    });

    it('should throw an error if updating removes both targets (Edge Case)', async () => {
      const mockVehicle = { id: 'v1', userId: 'u1' };
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle as any);
      
      const mockMaintenance = { id: '1', vehicleId: 'v1', targetDate: null, targetMileage: 10000 };
      vi.mocked(upcomingMaintenanceRepository.findById).mockResolvedValue(mockMaintenance as any);

      await expect(service.update('1', 'u1', { targetMileage: null }))
        .rejects
        .toThrow('VALIDATION_ERROR: Must provide targetDate or targetMileage');
    });
  });

  describe('listByUser', () => {
    it('should list upcoming maintenances by user id (Happy Path)', async () => {
      const mockData = [{ id: '1', vehicleId: 'v1' }];
      vi.mocked(upcomingMaintenanceRepository.findByUserId).mockResolvedValue(mockData as any);

      const result = await service.listByUser('u1');

      expect(result).toEqual(mockData);
      expect(upcomingMaintenanceRepository.findByUserId).toHaveBeenCalledWith('u1');
    });
  });
});
