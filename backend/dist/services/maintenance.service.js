"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceService = exports.MaintenanceService = void 0;
const maintenance_repository_js_1 = require("../repositories/maintenance.repository.js");
const vehicle_repository_js_1 = require("../repositories/vehicle.repository.js");
class MaintenanceService {
    async validateVehicleOwnership(vehicleId, userId) {
        const vehicle = await vehicle_repository_js_1.vehicleRepository.findById(vehicleId);
        if (!vehicle) {
            throw new Error('VEHICLE_NOT_FOUND');
        }
        if (vehicle.userId !== userId) {
            throw new Error('FORBIDDEN_ACCESS');
        }
    }
    async validateMaintenanceOwnership(id, userId) {
        const maintenance = await maintenance_repository_js_1.maintenanceRepository.findById(id);
        if (!maintenance) {
            throw new Error('MAINTENANCE_NOT_FOUND');
        }
        await this.validateVehicleOwnership(maintenance.vehicleId, userId);
        return maintenance;
    }
    async listByVehicle(vehicleId, userId) {
        await this.validateVehicleOwnership(vehicleId, userId);
        const data = await maintenance_repository_js_1.maintenanceRepository.findByVehicleId(vehicleId);
        const totalCost = await maintenance_repository_js_1.maintenanceRepository.getTotalCostByVehicleId(vehicleId);
        return { data, totalCost };
    }
    async getById(id, userId) {
        const maintenance = await this.validateMaintenanceOwnership(id, userId);
        return maintenance;
    }
    async create(vehicleId, userId, data) {
        await this.validateVehicleOwnership(vehicleId, userId);
        return maintenance_repository_js_1.maintenanceRepository.create({
            vehicleId,
            date: new Date(data.date),
            type: data.type,
            cost: data.cost,
            description: data.description ?? null,
        });
    }
    async update(id, userId, data) {
        await this.validateMaintenanceOwnership(id, userId);
        return maintenance_repository_js_1.maintenanceRepository.update(id, {
            ...(data.date ? { date: new Date(data.date) } : {}),
            ...(data.type ? { type: data.type } : {}),
            ...(data.cost !== undefined ? { cost: data.cost } : {}),
            ...(data.description !== undefined ? { description: data.description } : {}),
        });
    }
    async delete(id, userId) {
        await this.validateMaintenanceOwnership(id, userId);
        return maintenance_repository_js_1.maintenanceRepository.delete(id);
    }
}
exports.MaintenanceService = MaintenanceService;
exports.maintenanceService = new MaintenanceService();
