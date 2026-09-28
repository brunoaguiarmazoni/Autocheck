import { PrismaClient } from '@prisma/client';

export interface DashboardSummary {
  vehicle: {
    id: string;
    brand: string;
    model: string;
    year: number;
    licensePlate: string;
    currentMileage: number;
  };
  recentMaintenances: Array<{
    id: string;
    date: Date;
    type: string;
    cost: number;
    description: string | null;
  }>;
  upcomingMaintenances: Array<{
    id: string;
    description: string;
    targetDate: Date | null;
    targetMileage: number | null;
  }>;
  totalExpenses: number;
}

export class DashboardRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async getVehicleSummary(vehicleId: string, userId: string): Promise<DashboardSummary | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { 
        id: vehicleId,
        userId: userId
      },
      include: {
        maintenances: {
          orderBy: { date: 'desc' },
          take: 5,
          select: {
            id: true,
            date: true,
            type: true,
            cost: true,
            description: true,
          }
        },
        upcomingMaintenances: {
          orderBy: [
            { targetDate: 'asc' },
            { targetMileage: 'asc' }
          ],
          take: 5,
          select: {
            id: true,
            description: true,
            targetDate: true,
            targetMileage: true,
          }
        }
      }
    });

    if (!vehicle) {
      return null;
    }

    const expensesResult = await this.prisma.maintenance.aggregate({
      where: { vehicleId },
      _sum: {
        cost: true,
      }
    });

    return {
      vehicle: {
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        licensePlate: vehicle.licensePlate,
        currentMileage: vehicle.currentMileage,
      },
      recentMaintenances: vehicle.maintenances,
      upcomingMaintenances: vehicle.upcomingMaintenances,
      totalExpenses: expensesResult._sum.cost || 0,
    };
  }
}

export const dashboardRepository = new DashboardRepository();
