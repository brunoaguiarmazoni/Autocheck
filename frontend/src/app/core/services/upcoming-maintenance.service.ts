import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpcomingMaintenance, CreateUpcomingMaintenanceDTO, UpdateUpcomingMaintenanceDTO } from '../../shared/models/upcoming-maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class UpcomingMaintenanceService {
  private apiUrl = 'http://localhost:3001/api/v1';

  constructor(private http: HttpClient) {}

  listByVehicle(vehicleId: string): Observable<UpcomingMaintenance[]> {
    return this.http.get<UpcomingMaintenance[]>(`${this.apiUrl}/vehicles/${vehicleId}/upcoming-maintenances`);
  }

  listByUser(): Observable<UpcomingMaintenance[]> {
    return this.http.get<UpcomingMaintenance[]>(`${this.apiUrl}/upcoming-maintenances`);
  }

  getById(vehicleId: string, id: string): Observable<UpcomingMaintenance> {
    return this.http.get<UpcomingMaintenance>(`${this.apiUrl}/vehicles/${vehicleId}/upcoming-maintenances/${id}`);
  }

  create(vehicleId: string, data: CreateUpcomingMaintenanceDTO): Observable<UpcomingMaintenance> {
    return this.http.post<UpcomingMaintenance>(`${this.apiUrl}/vehicles/${vehicleId}/upcoming-maintenances`, data);
  }

  update(vehicleId: string, id: string, data: UpdateUpcomingMaintenanceDTO): Observable<UpcomingMaintenance> {
    return this.http.put<UpcomingMaintenance>(`${this.apiUrl}/vehicles/${vehicleId}/upcoming-maintenances/${id}`, data);
  }

  delete(vehicleId: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vehicles/${vehicleId}/upcoming-maintenances/${id}`);
  }
}
