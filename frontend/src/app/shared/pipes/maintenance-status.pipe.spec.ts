import { MaintenanceStatusPipe } from './maintenance-status.pipe';
import { UpcomingMaintenance } from '../models/upcoming-maintenance.model';

describe('MaintenanceStatusPipe', () => {
  let pipe: MaintenanceStatusPipe;

  beforeEach(() => {
    pipe = new MaintenanceStatusPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('targetDate logic', () => {
    it('should return atrasada if targetDate is in the past', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      const maintenance: UpcomingMaintenance = {
        id: '1',
        vehicleId: '1',
        description: 'Test',
        targetDate: pastDate,
        targetMileage: null
      };
      
      expect(pipe.transform(maintenance)).toBe('atrasada');
    });

    it('should return próxima if targetDate is within 30 days', () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const maintenance: UpcomingMaintenance = {
        id: '1',
        vehicleId: '1',
        description: 'Test',
        targetDate: nextWeek,
        targetMileage: null
      };
      
      expect(pipe.transform(maintenance)).toBe('próxima');
    });

    it('should return regular if targetDate is more than 30 days in future', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 40);
      
      const maintenance: UpcomingMaintenance = {
        id: '1',
        vehicleId: '1',
        description: 'Test',
        targetDate: futureDate,
        targetMileage: null
      };
      
      expect(pipe.transform(maintenance)).toBe('regular');
    });
  });

  describe('targetMileage logic', () => {
    it('should return atrasada if currentMileage >= targetMileage', () => {
      const maintenance: UpcomingMaintenance = {
        id: '1',
        vehicleId: '1',
        description: 'Test',
        targetDate: null,
        targetMileage: 50000
      };
      
      expect(pipe.transform(maintenance, 50000)).toBe('atrasada');
      expect(pipe.transform(maintenance, 51000)).toBe('atrasada');
    });

    it('should return próxima if currentMileage is within 1000km of targetMileage', () => {
      const maintenance: UpcomingMaintenance = {
        id: '1',
        vehicleId: '1',
        description: 'Test',
        targetDate: null,
        targetMileage: 50000
      };
      
      expect(pipe.transform(maintenance, 49000)).toBe('próxima');
      expect(pipe.transform(maintenance, 49500)).toBe('próxima');
    });

    it('should return regular if currentMileage is more than 1000km away', () => {
      const maintenance: UpcomingMaintenance = {
        id: '1',
        vehicleId: '1',
        description: 'Test',
        targetDate: null,
        targetMileage: 50000
      };
      
      expect(pipe.transform(maintenance, 48000)).toBe('regular');
    });

    it('should read currentMileage from nested vehicle if param is not provided', () => {
      const maintenance: UpcomingMaintenance = {
        id: '1',
        vehicleId: '1',
        description: 'Test',
        targetDate: null,
        targetMileage: 50000,
        vehicle: {
          id: '1',
          userId: '1',
          brand: 'Toyota',
          model: 'Corolla',
          year: 2020,
          licensePlate: 'ABC-1234',
          currentMileage: 50000
        }
      };
      
      expect(pipe.transform(maintenance)).toBe('atrasada');
    });
  });
});
