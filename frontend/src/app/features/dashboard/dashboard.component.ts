import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../core/services/vehicle.service';
import { DashboardService, DashboardSummary } from '../../core/services/dashboard.service';
import { VehicleStatsComponent } from './components/vehicle-stats.component';
import { RecentMaintenancesComponent } from './components/recent-maintenances.component';
import { UpcomingMaintenancesComponent } from './components/upcoming-maintenances.component';
import { Vehicle } from '../../shared/models/vehicle.model';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    VehicleStatsComponent, 
    RecentMaintenancesComponent, 
    UpcomingMaintenancesComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicleId: string = '';
  summary: DashboardSummary | null = null;
  loading = true;
  error = '';

  constructor(
    private vehicleService: VehicleService,
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        if (this.vehicles.length > 0) {
          this.selectedVehicleId = this.vehicles[0].id;
          this.loadSummary();
        } else {
          this.loading = false;
        }
      },
      error: () => {
        this.error = 'Erro ao carregar veículos.';
        this.loading = false;
      }
    });
  }

  onVehicleChange(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    if (!this.selectedVehicleId) return;
    
    this.loading = true;
    this.dashboardService.getSummary(this.selectedVehicleId).subscribe({
      next: (data) => {
        this.summary = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar o resumo do veículo.';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
