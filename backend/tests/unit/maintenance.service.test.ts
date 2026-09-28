import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MaintenanceService } from '../../src/services/maintenance.service';
import { maintenanceRepository } from '../../src/repositories/maintenance.repository';
import { vehicleRepository } from '../../src/repositories/vehicle.repository';
import { Maintenance, Vehicle } from '@prisma/client';

vi.mock('../../src/repositories/maintenance.repository');
vi.mock('../../src/repositories/vehicle.repository');

describe('MaintenanceService', () => {
  let service: MaintenanceService;

  beforeEach(() => {
    service = new MaintenanceService();
    vi.clearAllMocks();
  });

  const mockVehicle: Vehicle = {
    id: 'v1',
    userId: 'u1',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    licensePlate: 'ABC-1234',
    currentMileage: 50000,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockMaintenance: Maintenance = {
    id: 'm1',
    vehicleId: 'v1',
    date: new Date(),
    type: 'Preventiva',
    cost: 500,
    description: 'Troca de óleo',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('listByVehicle', () => {
    it('should return maintenance data and total cost (Happy Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);
      vi.mocked(maintenanceRepository.findByVehicleId).mockResolvedValue([mockMaintenance]);
      vi.mocked(maintenanceRepository.getTotalCostByVehicleId).mockResolvedValue(500);

      const result = await service.listByVehicle('v1', 'u1');

      expect(vehicleRepository.findById).toHaveBeenCalledWith('v1');
      expect(maintenanceRepository.findByVehicleId).toHaveBeenCalledWith('v1');
      expect(maintenanceRepository.getTotalCostByVehicleId).toHaveBeenCalledWith('v1');
      expect(result).toEqual({ data: [mockMaintenance], totalCost: 500 });
    });

    it('should throw VEHICLE_NOT_FOUND if vehicle does not exist (Sad Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(null);

      await expect(service.listByVehicle('v1', 'u1')).rejects.toThrow('VEHICLE_NOT_FOUND');
    });

    it('should throw FORBIDDEN_ACCESS if user does not own vehicle (Sad Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);

      await expect(service.listByVehicle('v1', 'u2')).rejects.toThrow('FORBIDDEN_ACCESS');
    });
  });

  describe('create', () => {
    it('should create maintenance (Happy Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);
      vi.mocked(maintenanceRepository.create).mockResolvedValue(mockMaintenance);

      const input = {
        date: new Date().toISOString(),
        type: 'Preventiva',
        cost: 500,
        description: 'Troca de óleo',
      };

      const result = await service.create('v1', 'u1', input);

      expect(maintenanceRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockMaintenance);
    });

    it('should throw FORBIDDEN_ACCESS if user does not own vehicle', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);

      await expect(service.create('v1', 'u2', { date: new Date().toISOString(), type: 'A', cost: 100 })).rejects.toThrow('FORBIDDEN_ACCESS');
    });
  });

  describe('update', () => {
    it('should update maintenance (Happy Path)', async () => {
      vi.mocked(maintenanceRepository.findById).mockResolvedValue(mockMaintenance);
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);
      vi.mocked(maintenanceRepository.update).mockResolvedValue({ ...mockMaintenance, cost: 600 });

      const result = await service.update('m1', 'u1', { cost: 600 });

      expect(maintenanceRepository.update).toHaveBeenCalledWith('m1', { cost: 600 });
      expect(result.cost).toBe(600);
    });

    it('should throw MAINTENANCE_NOT_FOUND if maintenance does not exist', async () => {
      vi.mocked(maintenanceRepository.findById).mockResolvedValue(null);

      await expect(service.update('m1', 'u1', {})).rejects.toThrow('MAINTENANCE_NOT_FOUND');
    });

    it('should throw FORBIDDEN_ACCESS if user does not own vehicle of the maintenance', async () => {
      vi.mocked(maintenanceRepository.findById).mockResolvedValue(mockMaintenance);
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);

      await expect(service.update('m1', 'u2', {})).rejects.toThrow('FORBIDDEN_ACCESS');
    });
  });

  describe('delete', () => {
    it('should delete maintenance (Happy Path)', async () => {
      vi.mocked(maintenanceRepository.findById).mockResolvedValue(mockMaintenance);
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);
      vi.mocked(maintenanceRepository.delete).mockResolvedValue(mockMaintenance);

      const result = await service.delete('m1', 'u1');

      expect(maintenanceRepository.delete).toHaveBeenCalledWith('m1');
      expect(result).toEqual(mockMaintenance);
    });
  });
});
