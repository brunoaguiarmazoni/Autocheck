import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance, MaintenanceListResponse, CreateMaintenanceDTO, UpdateMaintenanceDTO } from '../../shared/models/maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:3001/api/v1';

  constructor(private http: HttpClient) {}

  listByVehicle(vehicleId: string): Observable<MaintenanceListResponse> {
    return this.http.get<MaintenanceListResponse>(`${this.apiUrl}/vehicles/${vehicleId}/maintenances`);
  }

  getById(vehicleId: string, id: string): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${this.apiUrl}/vehicles/${vehicleId}/maintenances/${id}`);
  }

  create(vehicleId: string, data: CreateMaintenanceDTO): Observable<Maintenance> {
    return this.http.post<Maintenance>(`${this.apiUrl}/vehicles/${vehicleId}/maintenances`, data);
  }

  update(vehicleId: string, id: string, data: UpdateMaintenanceDTO): Observable<Maintenance> {
    return this.http.put<Maintenance>(`${this.apiUrl}/vehicles/${vehicleId}/maintenances/${id}`, data);
  }

  delete(vehicleId: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vehicles/${vehicleId}/maintenances/${id}`);
  }
}
