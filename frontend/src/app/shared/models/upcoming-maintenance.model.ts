import { Vehicle } from './vehicle.model';

export interface UpcomingMaintenance {
  id: string;
  vehicleId: string;
  description: string;
  targetDate: string | Date | null;
  targetMileage: number | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  vehicle?: Vehicle;
}

export interface CreateUpcomingMaintenanceDTO {
  description: string;
  targetDate?: string;
  targetMileage?: number;
}

export interface UpdateUpcomingMaintenanceDTO {
  description?: string;
  targetDate?: string | null;
  targetMileage?: number | null;
}
