import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UpcomingMaintenanceRepository } from '../../src/repositories/upcoming-maintenance.repository';

describe('UpcomingMaintenanceRepository', () => {
  let repository: UpcomingMaintenanceRepository;
  let mockPrismaClient: any;

  beforeEach(() => {
    mockPrismaClient = {
      upcomingMaintenance: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    };
    repository = new UpcomingMaintenanceRepository(mockPrismaClient);
  });

  it('should find by vehicle id', async () => {
    const mockData = [{ id: '1', vehicleId: 'v1' }];
    mockPrismaClient.upcomingMaintenance.findMany.mockResolvedValue(mockData);

    const result = await repository.findByVehicleId('v1');

    expect(mockPrismaClient.upcomingMaintenance.findMany).toHaveBeenCalledWith({
      where: { vehicleId: 'v1' },
      orderBy: { createdAt: 'desc' },
    });
    expect(result).toEqual(mockData);
  });

  it('should find by id', async () => {
    const mockData = { id: '1' };
    mockPrismaClient.upcomingMaintenance.findUnique.mockResolvedValue(mockData);

    const result = await repository.findById('1');

    expect(mockPrismaClient.upcomingMaintenance.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual(mockData);
  });

  it('should create an upcoming maintenance', async () => {
    const mockData = { vehicleId: 'v1', description: 'Test', targetDate: new Date(), targetMileage: 10000 };
    mockPrismaClient.upcomingMaintenance.create.mockResolvedValue({ id: '1', ...mockData });

    const result = await repository.create(mockData);

    expect(mockPrismaClient.upcomingMaintenance.create).toHaveBeenCalledWith({
      data: mockData,
    });
    expect(result.id).toBe('1');
  });

  it('should update an upcoming maintenance', async () => {
    const mockData = { description: 'Updated' };
    mockPrismaClient.upcomingMaintenance.update.mockResolvedValue({ id: '1', ...mockData });

    const result = await repository.update('1', mockData);

    expect(mockPrismaClient.upcomingMaintenance.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: mockData,
    });
    expect(result.id).toBe('1');
  });

  it('should delete an upcoming maintenance', async () => {
    const mockData = { id: '1' };
    mockPrismaClient.upcomingMaintenance.delete.mockResolvedValue(mockData);

    const result = await repository.delete('1');

    expect(mockPrismaClient.upcomingMaintenance.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual(mockData);
  });

  it('should find by user id', async () => {
    const mockData = [
      { id: '1', vehicleId: 'v1', vehicle: { userId: 'u1' } },
      { id: '2', vehicleId: 'v2', vehicle: { userId: 'u1' } }
    ];
    mockPrismaClient.upcomingMaintenance.findMany.mockResolvedValue(mockData);

    const result = await repository.findByUserId('u1');

    expect(mockPrismaClient.upcomingMaintenance.findMany).toHaveBeenCalledWith({
      where: { vehicle: { userId: 'u1' } },
      include: { vehicle: true },
    });
    expect(result).toEqual(mockData);
  });
});
