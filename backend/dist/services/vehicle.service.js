"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = exports.VehicleService = void 0;
const vehicle_repository_js_1 = require("../repositories/vehicle.repository.js");
class VehicleService {
    async listByUser(userId) {
        return vehicle_repository_js_1.vehicleRepository.findByUserId(userId);
    }
    async getById(id, userId) {
        const vehicle = await vehicle_repository_js_1.vehicleRepository.findById(id);
        if (!vehicle) {
            throw new Error('VEHICLE_NOT_FOUND');
        }
        if (vehicle.userId !== userId) {
            throw new Error('FORBIDDEN_ACCESS');
        }
        return vehicle;
    }
    async create(userId, data) {
        return vehicle_repository_js_1.vehicleRepository.create({
            ...data,
            userId,
        });
    }
    async update(id, userId, data) {
        const vehicle = await vehicle_repository_js_1.vehicleRepository.findById(id);
        if (!vehicle) {
            throw new Error('VEHICLE_NOT_FOUND');
        }
        if (vehicle.userId !== userId) {
            throw new Error('FORBIDDEN_ACCESS');
        }
        return vehicle_repository_js_1.vehicleRepository.update(id, data);
    }
    async delete(id, userId) {
        const vehicle = await vehicle_repository_js_1.vehicleRepository.findById(id);
        if (!vehicle) {
            throw new Error('VEHICLE_NOT_FOUND');
        }
        if (vehicle.userId !== userId) {
            throw new Error('FORBIDDEN_ACCESS');
        }
        return vehicle_repository_js_1.vehicleRepository.delete(id);
    }
}
exports.VehicleService = VehicleService;
exports.vehicleService = new VehicleService();
