import { UpcomingMaintenance } from '@prisma/client';
import { upcomingMaintenanceRepository } from '../repositories/upcoming-maintenance.repository.js';
import { vehicleRepository } from '../repositories/vehicle.repository.js';
import { CreateUpcomingMaintenanceDTO, UpdateUpcomingMaintenanceDTO } from '../models/upcoming-maintenance.schema.js';

export class UpcomingMaintenanceService {
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
    const maintenance = await upcomingMaintenanceRepository.findById(id);

    if (!maintenance) {
      throw new Error('MAINTENANCE_NOT_FOUND');
    }

    await this.validateVehicleOwnership(maintenance.vehicleId, userId);

    return maintenance;
  }

  async listByVehicle(vehicleId: string, userId: string): Promise<UpcomingMaintenance[]> {
    await this.validateVehicleOwnership(vehicleId, userId);
    return upcomingMaintenanceRepository.findByVehicleId(vehicleId);
  }

  async listByUser(userId: string): Promise<UpcomingMaintenance[]> {
    return upcomingMaintenanceRepository.findByUserId(userId);
  }

  async getById(id: string, userId: string): Promise<UpcomingMaintenance> {
    const maintenance = await this.validateMaintenanceOwnership(id, userId);
    return maintenance;
  }

  async create(vehicleId: string, userId: string, data: CreateUpcomingMaintenanceDTO): Promise<UpcomingMaintenance> {
    await this.validateVehicleOwnership(vehicleId, userId);

    if (data.targetDate === undefined && data.targetMileage === undefined) {
      throw new Error('VALIDATION_ERROR: Must provide targetDate or targetMileage');
    }

    return upcomingMaintenanceRepository.create({
      vehicleId,
      description: data.description,
      targetDate: data.targetDate ? new Date(data.targetDate) : null,
      targetMileage: data.targetMileage ?? null,
    });
  }

  async update(id: string, userId: string, data: UpdateUpcomingMaintenanceDTO): Promise<UpcomingMaintenance> {
    const maintenance = await this.validateMaintenanceOwnership(id, userId);

    const hasTargetDate = data.targetDate !== undefined ? data.targetDate !== null : maintenance.targetDate !== null;
    const hasTargetMileage = data.targetMileage !== undefined ? data.targetMileage !== null : maintenance.targetMileage !== null;

    if (!hasTargetDate && !hasTargetMileage) {
      throw new Error('VALIDATION_ERROR: Must provide targetDate or targetMileage');
    }

    return upcomingMaintenanceRepository.update(id, {
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.targetDate !== undefined ? { targetDate: data.targetDate ? new Date(data.targetDate) : null } : {}),
      ...(data.targetMileage !== undefined ? { targetMileage: data.targetMileage } : {}),
    });
  }

  async delete(id: string, userId: string): Promise<UpcomingMaintenance> {
    await this.validateMaintenanceOwnership(id, userId);
    return upcomingMaintenanceRepository.delete(id);
  }
}

export const upcomingMaintenanceService = new UpcomingMaintenanceService();
