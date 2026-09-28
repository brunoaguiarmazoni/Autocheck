import { DashboardService, DashboardSummary } from './dashboard.service';
import { of } from 'rxjs';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpClientSpy: any;

  const mockSummary: DashboardSummary = {
    vehicle: {
      id: 'v1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      licensePlate: 'ABC-1234',
      currentMileage: 50000
    },
    recentMaintenances: [],
    upcomingMaintenances: [],
    totalExpenses: 0
  };

  beforeEach(() => {
    httpClientSpy = {
      get: vitest.fn()
    };
    service = new DashboardService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the vehicle summary', async () => {
    httpClientSpy.get.mockReturnValue(of(mockSummary));

    const summary = await new Promise((resolve) => {
      service.getSummary('v1').subscribe((res) => resolve(res));
    });

    expect(summary).toEqual(mockSummary);
    expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3001/api/v1/vehicles/v1/summary');
  });
});
