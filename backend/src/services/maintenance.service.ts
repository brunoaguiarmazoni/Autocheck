import { Maintenance } from '@prisma/client';
import { maintenanceRepository } from '../repositories/maintenance.repository.js';
import { vehicleRepository } from '../repositories/vehicle.repository.js';
import { CreateMaintenanceDTO, UpdateMaintenanceDTO } from '../models/maintenance.schema.js';

export class MaintenanceService {
  private async validateVehicleOwnership(vehicleId: string, userId: string) {
    const vehicle = await vehicleRepository.findById(vehicleId);
    
    if (!vehicle) {
      throw new Error('VEHICLE_NOT_FOUND');
    }

    if (vehicle.userId !== userId) {
      throw new Error('FORBIDDEN_ACCESS');
    }
  }

  private async validateMaintenanceOwnership(id: string, userId: string) {
    const maintenance = await maintenanceRepository.findById(id);

    if (!maintenance) {
      throw new Error('MAINTENANCE_NOT_FOUND');
    }

    await this.validateVehicleOwnership(maintenance.vehicleId, userId);

    return maintenance;
  }

  async listByVehicle(vehicleId: string, userId: string): Promise<{ data: Maintenance[], totalCost: number }> {
    await this.validateVehicleOwnership(vehicleId, userId);

    const data = await maintenanceRepository.findByVehicleId(vehicleId);
    const totalCost = await maintenanceRepository.getTotalCostByVehicleId(vehicleId);

    return { data, totalCost };
  }

  async getById(id: string, userId: string): Promise<Maintenance> {
    const maintenance = await this.validateMaintenanceOwnership(id, userId);
    return maintenance;
  }

  async create(vehicleId: string, userId: string, data: CreateMaintenanceDTO): Promise<Maintenance> {
    await this.validateVehicleOwnership(vehicleId, userId);

    return maintenanceRepository.create({
      vehicleId,
      date: new Date(data.date),
      type: data.type,
      cost: data.cost,
      description: data.description ?? null,
    });
  }

  async update(id: string, userId: string, data: UpdateMaintenanceDTO): Promise<Maintenance> {
    await this.validateMaintenanceOwnership(id, userId);

    return maintenanceRepository.update(id, {
      ...(data.date ? { date: new Date(data.date) } : {}),
      ...(data.type ? { type: data.type } : {}),
      ...(data.cost !== undefined ? { cost: data.cost } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
    });
  }

  async delete(id: string, userId: string): Promise<Maintenance> {
    await this.validateMaintenanceOwnership(id, userId);
    return maintenanceRepository.delete(id);
  }
}

export const maintenanceService = new MaintenanceService();
