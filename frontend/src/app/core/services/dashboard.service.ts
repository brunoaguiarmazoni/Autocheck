import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface DashboardSummary {
  vehicle: {
    id: string;
    brand: string;
    model: string;
    year: number;
    licensePlate: string;
    currentMileage: number;
  };
  recentMaintenances: Array<{
    id: string;
    date: string;
    type: string;
    cost: number;
    description: string | null;
  }>;
  upcomingMaintenances: Array<{
    id: string;
    description: string;
    targetDate: string | null;
    targetMileage: number | null;
  }>;
  totalExpenses: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSummary(vehicleId: string): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/vehicles/${vehicleId}/summary`);
  }
}
