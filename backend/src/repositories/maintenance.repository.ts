import { PrismaClient, Maintenance } from '@prisma/client';

export class MaintenanceRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async findByVehicleId(vehicleId: string): Promise<Maintenance[]> {
    return this.prisma.maintenance.findMany({
      where: { vehicleId },
      orderBy: { date: 'desc' },
    });
  }

  async findById(id: string): Promise<Maintenance | null> {
    return this.prisma.maintenance.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Maintenance, 'id' | 'createdAt' | 'updatedAt'>): Promise<Maintenance> {
    return this.prisma.maintenance.create({
      data,
    });
  }

  async update(id: string, data: Partial<Omit<Maintenance, 'id' | 'vehicleId' | 'createdAt' | 'updatedAt'>>): Promise<Maintenance> {
    return this.prisma.maintenance.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Maintenance> {
    return this.prisma.maintenance.delete({
      where: { id },
    });
  }

  async getTotalCostByVehicleId(vehicleId: string): Promise<number> {
    const result = await this.prisma.maintenance.aggregate({
      where: { vehicleId },
      _sum: {
        cost: true,
      },
    });
    return result._sum.cost || 0;
  }
}

export const maintenanceRepository = new MaintenanceRepository();
