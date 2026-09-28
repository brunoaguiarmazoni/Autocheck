import { UpcomingMaintenanceService } from './upcoming-maintenance.service';
import { of, throwError } from 'rxjs';
import { UpcomingMaintenance, CreateUpcomingMaintenanceDTO, UpdateUpcomingMaintenanceDTO } from '../../shared/models/upcoming-maintenance.model';

describe('UpcomingMaintenanceService', () => {
  let service: UpcomingMaintenanceService;
  let httpClientSpy: any;

  const mockUpcomingMaintenance: UpcomingMaintenance = {
    id: 'um-123',
    vehicleId: 'vehicle-123',
    description: 'Troca de Óleo',
    targetDate: '2026-12-31T00:00:00Z',
    targetMileage: 50000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  beforeEach(() => {
    httpClientSpy = {
      get: vitest.fn(),
      post: vitest.fn(),
      put: vitest.fn(),
      delete: vitest.fn()
    };
    service = new UpcomingMaintenanceService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('listByVehicle', () => {
    it('should list upcoming maintenances by vehicle', () => {
      httpClientSpy.get.mockReturnValue(of([mockUpcomingMaintenance]));
      service.listByVehicle('vehicle-123').subscribe(maintenances => {
        expect(maintenances).toEqual([mockUpcomingMaintenance]);
      });
      expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3001/api/v1/vehicles/vehicle-123/upcoming-maintenances');
    });

    it('should handle error when listing by vehicle', () => {
      httpClientSpy.get.mockReturnValue(throwError(() => new Error('Error')));
      service.listByVehicle('vehicle-123').subscribe({
        error: (err) => expect(err.message).toBe('Error')
      });
    });
  });

  describe('listByUser', () => {
    it('should list upcoming maintenances globally', () => {
      httpClientSpy.get.mockReturnValue(of([mockUpcomingMaintenance]));
      service.listByUser().subscribe(maintenances => {
        expect(maintenances).toEqual([mockUpcomingMaintenance]);
      });
      expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3001/api/v1/upcoming-maintenances');
    });
  });

  describe('getById', () => {
    it('should get upcoming maintenance by id', () => {
      httpClientSpy.get.mockReturnValue(of(mockUpcomingMaintenance));
      service.getById('vehicle-123', 'um-123').subscribe(maintenance => {
        expect(maintenance).toEqual(mockUpcomingMaintenance);
      });
      expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3001/api/v1/vehicles/vehicle-123/upcoming-maintenances/um-123');
    });
  });

  describe('create', () => {
    it('should create an upcoming maintenance', () => {
      httpClientSpy.post.mockReturnValue(of(mockUpcomingMaintenance));
      const dto: CreateUpcomingMaintenanceDTO = {
        description: 'Troca de Óleo',
        targetMileage: 50000
      };

      service.create('vehicle-123', dto).subscribe(maintenance => {
        expect(maintenance).toEqual(mockUpcomingMaintenance);
      });
      expect(httpClientSpy.post).toHaveBeenCalledWith('http://localhost:3001/api/v1/vehicles/vehicle-123/upcoming-maintenances', dto);
    });
  });

  describe('update', () => {
    it('should update an upcoming maintenance', () => {
      const updatedMaintenance = { ...mockUpcomingMaintenance, targetMileage: 60000 };
      httpClientSpy.put.mockReturnValue(of(updatedMaintenance));
      
      const dto: UpdateUpcomingMaintenanceDTO = { targetMileage: 60000 };

      service.update('vehicle-123', 'um-123', dto).subscribe(maintenance => {
        expect(maintenance).toEqual(updatedMaintenance);
      });
      expect(httpClientSpy.put).toHaveBeenCalledWith('http://localhost:3001/api/v1/vehicles/vehicle-123/upcoming-maintenances/um-123', dto);
    });
  });

  describe('delete', () => {
    it('should delete an upcoming maintenance', () => {
      httpClientSpy.delete.mockReturnValue(of(null));
      service.delete('vehicle-123', 'um-123').subscribe(() => {
        expect(true).toBe(true);
      });
      expect(httpClientSpy.delete).toHaveBeenCalledWith('http://localhost:3001/api/v1/vehicles/vehicle-123/upcoming-maintenances/um-123');
    });
  });
});
