"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceRepository = exports.MaintenanceRepository = void 0;
const client_1 = require("@prisma/client");
class MaintenanceRepository {
    prisma;
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    async findByVehicleId(vehicleId) {
        return this.prisma.maintenance.findMany({
            where: { vehicleId },
            orderBy: { date: 'desc' },
        });
    }
    async findById(id) {
        return this.prisma.maintenance.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.maintenance.create({
            data,
        });
    }
    async update(id, data) {
        return this.prisma.maintenance.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.maintenance.delete({
            where: { id },
        });
    }
    async getTotalCostByVehicleId(vehicleId) {
        const result = await this.prisma.maintenance.aggregate({
            where: { vehicleId },
            _sum: {
                cost: true,
            },
        });
        return result._sum.cost || 0;
    }
}
exports.MaintenanceRepository = MaintenanceRepository;
exports.maintenanceRepository = new MaintenanceRepository();
