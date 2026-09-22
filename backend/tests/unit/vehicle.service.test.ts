import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VehicleService } from '../../src/services/vehicle.service.js';
import { vehicleRepository } from '../../src/repositories/vehicle.repository.js';
import { Vehicle } from '@prisma/client';

vi.mock('../../src/repositories/vehicle.repository.js', () => ({
  vehicleRepository: {
    findByUserId: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('VehicleService (Unit Tests)', () => {
  let vehicleService: VehicleService;
  const mockVehicle: Vehicle = {
    id: 'vehicle-123',
    userId: 'user-123',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    licensePlate: 'ABC-1234',
    currentMileage: 50000,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vehicleService = new VehicleService();
    vi.clearAllMocks();
  });

  describe('listByUser', () => {
    it('should return a list of vehicles for the given user (Happy Path)', async () => {
      vi.mocked(vehicleRepository.findByUserId).mockResolvedValue([mockVehicle]);

      const result = await vehicleService.listByUser('user-123');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockVehicle);
      expect(vehicleRepository.findByUserId).toHaveBeenCalledWith('user-123');
    });
  });

  describe('getById', () => {
    it('should return a vehicle if it belongs to the user (Happy Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);

      const result = await vehicleService.getById('vehicle-123', 'user-123');

      expect(result).toEqual(mockVehicle);
      expect(vehicleRepository.findById).toHaveBeenCalledWith('vehicle-123');
    });

    it('should throw an error if the vehicle is not found (Sad Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(null);

      await expect(vehicleService.getById('invalid-id', 'user-123')).rejects.toThrow('VEHICLE_NOT_FOUND');
    });

    it('should throw an error if the vehicle belongs to another user (Edge Case/IDOR)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);

      await expect(vehicleService.getById('vehicle-123', 'other-user')).rejects.toThrow('FORBIDDEN_ACCESS');
    });
  });

  describe('create', () => {
    it('should create and return a vehicle (Happy Path)', async () => {
      vi.mocked(vehicleRepository.create).mockResolvedValue(mockVehicle);

      const data = {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: 'ABC-1234',
        currentMileage: 50000,
      };

      const result = await vehicleService.create('user-123', data);

      expect(result).toEqual(mockVehicle);
      expect(vehicleRepository.create).toHaveBeenCalledWith({ ...data, userId: 'user-123' });
    });
  });

  describe('update', () => {
    it('should update and return the vehicle if it belongs to the user (Happy Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);
      const updatedVehicle = { ...mockVehicle, currentMileage: 60000 };
      vi.mocked(vehicleRepository.update).mockResolvedValue(updatedVehicle);

      const result = await vehicleService.update('vehicle-123', 'user-123', { currentMileage: 60000 });

      expect(result).toEqual(updatedVehicle);
      expect(vehicleRepository.update).toHaveBeenCalledWith('vehicle-123', { currentMileage: 60000 });
    });

    it('should throw an error if the vehicle to update is not found (Sad Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(null);

      await expect(vehicleService.update('invalid-id', 'user-123', { currentMileage: 60000 })).rejects.toThrow('VEHICLE_NOT_FOUND');
    });

    it('should throw an error if trying to update a vehicle of another user (Edge Case/IDOR)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);

      await expect(vehicleService.update('vehicle-123', 'other-user', { currentMileage: 60000 })).rejects.toThrow('FORBIDDEN_ACCESS');
    });
  });

  describe('delete', () => {
    it('should delete and return the vehicle if it belongs to the user (Happy Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);
      vi.mocked(vehicleRepository.delete).mockResolvedValue(mockVehicle);

      const result = await vehicleService.delete('vehicle-123', 'user-123');

      expect(result).toEqual(mockVehicle);
      expect(vehicleRepository.delete).toHaveBeenCalledWith('vehicle-123');
    });

    it('should throw an error if the vehicle to delete is not found (Sad Path)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(null);

      await expect(vehicleService.delete('invalid-id', 'user-123')).rejects.toThrow('VEHICLE_NOT_FOUND');
    });

    it('should throw an error if trying to delete a vehicle of another user (Edge Case/IDOR)', async () => {
      vi.mocked(vehicleRepository.findById).mockResolvedValue(mockVehicle);

      await expect(vehicleService.delete('vehicle-123', 'other-user')).rejects.toThrow('FORBIDDEN_ACCESS');
    });
  });
});
