import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle, CreateVehicleDTO, UpdateVehicleDTO } from '../../shared/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly API_URL = 'http://localhost:3001/api/v1/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.API_URL);
  }

  getVehicleById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.API_URL}/${id}`);
  }

  createVehicle(data: CreateVehicleDTO): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.API_URL, data);
  }

  updateVehicle(id: string, data: UpdateVehicleDTO): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.API_URL}/${id}`, data);
  }

  deleteVehicle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
