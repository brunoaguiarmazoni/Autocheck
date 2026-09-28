export interface Maintenance {
  id: string;
  vehicleId: string;
  date: string | Date;
  type: string;
  cost: number;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface MaintenanceListResponse {
  data: Maintenance[];
  totalCost: number;
}

export interface CreateMaintenanceDTO {
  date: string;
  type: string;
  cost: number;
  description?: string;
}

export interface UpdateMaintenanceDTO {
  date?: string;
  type?: string;
  cost?: number;
  description?: string;
}
