import { PrismaClient, Vehicle } from '@prisma/client';

export class VehicleRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async findByUserId(userId: string): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
    return this.prisma.vehicle.create({
      data,
    });
  }

  async update(id: string, data: Partial<Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Vehicle> {
    return this.prisma.vehicle.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Vehicle> {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}

export const vehicleRepository = new VehicleRepository();
