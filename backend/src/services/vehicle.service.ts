import { Vehicle } from '@prisma/client';
import { vehicleRepository } from '../repositories/vehicle.repository.js';
import { CreateVehicleDTO, UpdateVehicleDTO } from '../models/vehicle.schema.js';

export class VehicleService {
  async listByUser(userId: string): Promise<Vehicle[]> {
    return vehicleRepository.findByUserId(userId);
  }

  async getById(id: string, userId: string): Promise<Vehicle> {
    const vehicle = await vehicleRepository.findById(id);
    
    if (!vehicle) {
      throw new Error('VEHICLE_NOT_FOUND');
    }

    if (vehicle.userId !== userId) {
      throw new Error('FORBIDDEN_ACCESS');
    }

    return vehicle;
  }

  async create(userId: string, data: CreateVehicleDTO): Promise<Vehicle> {
    return vehicleRepository.create({
      ...data,
      userId,
    });
  }

  async update(id: string, userId: string, data: UpdateVehicleDTO): Promise<Vehicle> {
    const vehicle = await vehicleRepository.findById(id);

    if (!vehicle) {
      throw new Error('VEHICLE_NOT_FOUND');
    }

    if (vehicle.userId !== userId) {
      throw new Error('FORBIDDEN_ACCESS');
    }

    return vehicleRepository.update(id, data);
  }

  async delete(id: string, userId: string): Promise<Vehicle> {
    const vehicle = await vehicleRepository.findById(id);

    if (!vehicle) {
      throw new Error('VEHICLE_NOT_FOUND');
    }

    if (vehicle.userId !== userId) {
      throw new Error('FORBIDDEN_ACCESS');
    }

    return vehicleRepository.delete(id);
  }
}

export const vehicleService = new VehicleService();
