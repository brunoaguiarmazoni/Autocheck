import { VehicleService } from './vehicle.service';
import { of } from 'rxjs';
import { Vehicle, CreateVehicleDTO, UpdateVehicleDTO } from '../../shared/models/vehicle.model';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpClientSpy: any;

  const mockVehicle: Vehicle = {
    id: 'vehicle-123',
    userId: 'user-123',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    licensePlate: 'ABC-1234',
    currentMileage: 50000,
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
    service = new VehicleService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get vehicles', () => {
    httpClientSpy.get.mockReturnValue(of([mockVehicle]));
    service.getVehicles().subscribe(vehicles => {
      expect(vehicles).toEqual([mockVehicle]);
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should get vehicle by id', () => {
    httpClientSpy.get.mockReturnValue(of(mockVehicle));
    service.getVehicleById('vehicle-123').subscribe(vehicle => {
      expect(vehicle).toEqual(mockVehicle);
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should create vehicle', () => {
    httpClientSpy.post.mockReturnValue(of(mockVehicle));
    const dto: CreateVehicleDTO = {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      licensePlate: 'ABC-1234',
      currentMileage: 50000
    };

    service.createVehicle(dto).subscribe(vehicle => {
      expect(vehicle).toEqual(mockVehicle);
    });
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should update vehicle', () => {
    const updatedVehicle = { ...mockVehicle, currentMileage: 60000 };
    httpClientSpy.put.mockReturnValue(of(updatedVehicle));
    
    const dto: UpdateVehicleDTO = { currentMileage: 60000 };

    service.updateVehicle('vehicle-123', dto).subscribe(vehicle => {
      expect(vehicle).toEqual(updatedVehicle);
    });
    expect(httpClientSpy.put).toHaveBeenCalled();
  });

  it('should delete vehicle', () => {
    httpClientSpy.delete.mockReturnValue(of(null));
    service.deleteVehicle('vehicle-123').subscribe(() => {
      expect(true).toBe(true);
    });
    expect(httpClientSpy.delete).toHaveBeenCalled();
  });
});
