"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRepository = exports.VehicleRepository = void 0;
const client_1 = require("@prisma/client");
class VehicleRepository {
    prisma;
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    async findByUserId(userId) {
        return this.prisma.vehicle.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return this.prisma.vehicle.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.vehicle.create({
            data,
        });
    }
    async update(id, data) {
        return this.prisma.vehicle.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.vehicle.delete({
            where: { id },
        });
    }
}
exports.VehicleRepository = VehicleRepository;
exports.vehicleRepository = new VehicleRepository();
