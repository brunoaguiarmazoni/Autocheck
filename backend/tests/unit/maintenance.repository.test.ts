import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MaintenanceRepository } from '../../src/repositories/maintenance.repository';

describe('MaintenanceRepository', () => {
  let repository: MaintenanceRepository;
  let mockPrismaClient: any;

  beforeEach(() => {
    mockPrismaClient = {
      maintenance: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        aggregate: vi.fn(),
      },
    };
    repository = new MaintenanceRepository(mockPrismaClient);
  });

  it('should find by vehicle id', async () => {
    const mockData = [{ id: '1', vehicleId: 'v1' }];
    mockPrismaClient.maintenance.findMany.mockResolvedValue(mockData);

    const result = await repository.findByVehicleId('v1');

    expect(mockPrismaClient.maintenance.findMany).toHaveBeenCalledWith({
      where: { vehicleId: 'v1' },
      orderBy: { date: 'desc' },
    });
    expect(result).toEqual(mockData);
  });

  it('should find by id', async () => {
    const mockData = { id: '1' };
    mockPrismaClient.maintenance.findUnique.mockResolvedValue(mockData);

    const result = await repository.findById('1');

    expect(mockPrismaClient.maintenance.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual(mockData);
  });

  it('should create a maintenance', async () => {
    const mockData = { vehicleId: 'v1', date: new Date(), type: 'Test', cost: 100 };
    mockPrismaClient.maintenance.create.mockResolvedValue({ id: '1', ...mockData });

    const result = await repository.create(mockData);

    expect(mockPrismaClient.maintenance.create).toHaveBeenCalledWith({
      data: mockData,
    });
    expect(result.id).toBe('1');
  });

  it('should update a maintenance', async () => {
    const mockData = { cost: 200 };
    mockPrismaClient.maintenance.update.mockResolvedValue({ id: '1', ...mockData });

    const result = await repository.update('1', mockData);

    expect(mockPrismaClient.maintenance.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: mockData,
    });
    expect(result.id).toBe('1');
  });

  it('should delete a maintenance', async () => {
    const mockData = { id: '1' };
    mockPrismaClient.maintenance.delete.mockResolvedValue(mockData);

    const result = await repository.delete('1');

    expect(mockPrismaClient.maintenance.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual(mockData);
  });

  it('should get total cost by vehicle id', async () => {
    mockPrismaClient.maintenance.aggregate.mockResolvedValue({ _sum: { cost: 350 } });

    const result = await repository.getTotalCostByVehicleId('v1');

    expect(mockPrismaClient.maintenance.aggregate).toHaveBeenCalledWith({
      where: { vehicleId: 'v1' },
      _sum: { cost: true },
    });
    expect(result).toBe(350);
  });

  it('should return 0 when there is no maintenance for the vehicle', async () => {
    mockPrismaClient.maintenance.aggregate.mockResolvedValue({ _sum: { cost: null } });

    const result = await repository.getTotalCostByVehicleId('v2');

    expect(result).toBe(0);
  });
});
