import { PrismaClient, UpcomingMaintenance } from '@prisma/client';

export class UpcomingMaintenanceRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async findByVehicleId(vehicleId: string): Promise<UpcomingMaintenance[]> {
    return this.prisma.upcomingMaintenance.findMany({
      where: { vehicleId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<UpcomingMaintenance | null> {
    return this.prisma.upcomingMaintenance.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<UpcomingMaintenance, 'id' | 'createdAt' | 'updatedAt'>): Promise<UpcomingMaintenance> {
    return this.prisma.upcomingMaintenance.create({
      data,
    });
  }

  async update(id: string, data: Partial<Omit<UpcomingMaintenance, 'id' | 'vehicleId' | 'createdAt' | 'updatedAt'>>): Promise<UpcomingMaintenance> {
    return this.prisma.upcomingMaintenance.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<UpcomingMaintenance> {
    return this.prisma.upcomingMaintenance.delete({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.upcomingMaintenance.findMany({
      where: {
        vehicle: {
          userId,
        },
      },
      include: {
        vehicle: true,
      },
    });
  }
}

export const upcomingMaintenanceRepository = new UpcomingMaintenanceRepository();
