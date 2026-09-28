import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../shared/models/vehicle.model';
import { MaintenanceListComponent } from '../../maintenances/maintenance-list/maintenance-list.component';
import { UpcomingMaintenanceListComponent } from '../../upcoming-maintenances/upcoming-maintenance-list/upcoming-maintenance-list.component';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MaintenanceListComponent, UpcomingMaintenanceListComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle | null = null;
  loading = true;
  error = '';
  activeTab: 'details' | 'maintenances' | 'upcoming-maintenances' = 'details';

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadVehicle(id);
    } else {
      this.error = 'ID do veículo não fornecido.';
      this.loading = false;
    }
  }

  loadVehicle(id: string): void {
    this.loading = true;
    this.vehicleService.getVehicleById(id).subscribe({
      next: (data) => {
        this.vehicle = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.title || 'Erro ao carregar veículo.';
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: 'details' | 'maintenances' | 'upcoming-maintenances'): void {
    this.activeTab = tab;
  }
}
