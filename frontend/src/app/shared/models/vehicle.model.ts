export interface Vehicle {
  id: string;
  userId: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  currentMileage: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVehicleDTO {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  currentMileage: number;
}

export interface UpdateVehicleDTO {
  brand?: string;
  model?: string;
  year?: number;
  licensePlate?: string;
  currentMileage?: number;
}
