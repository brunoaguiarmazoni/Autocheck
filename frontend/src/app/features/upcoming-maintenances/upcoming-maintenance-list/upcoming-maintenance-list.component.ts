import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingMaintenanceService } from '../../../core/services/upcoming-maintenance.service';
import { UpcomingMaintenance } from '../../../shared/models/upcoming-maintenance.model';
import { MaintenanceStatusPipe } from '../../../shared/pipes/maintenance-status.pipe';

import { UpcomingMaintenanceFormComponent } from '../upcoming-maintenance-form/upcoming-maintenance-form.component';

@Component({
  selector: 'app-upcoming-maintenance-list',
  standalone: true,
  imports: [CommonModule, MaintenanceStatusPipe, UpcomingMaintenanceFormComponent],
  templateUrl: './upcoming-maintenance-list.component.html',
  styleUrls: ['./upcoming-maintenance-list.component.css']
})
export class UpcomingMaintenanceListComponent implements OnInit {
  @Input() vehicleId!: string;
  @Input() currentMileage!: number;

  maintenances: UpcomingMaintenance[] = [];
  loading = true;
  error = '';
  showForm = false;
  editingMaintenance: UpcomingMaintenance | null = null;

  constructor(private upcomingMaintenanceService: UpcomingMaintenanceService) {}

  ngOnInit(): void {
    if (this.vehicleId) {
      this.loadMaintenances();
    }
  }

  loadMaintenances(): void {
    this.loading = true;
    this.upcomingMaintenanceService.listByVehicle(this.vehicleId).subscribe({
      next: (data: any) => {
        this.maintenances = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.title || 'Erro ao carregar previsões de manutenção.';
        this.loading = false;
      }
    });
  }

  openNewForm(): void {
    this.editingMaintenance = null;
    this.showForm = true;
  }

  openEditForm(maintenance: UpcomingMaintenance): void {
    this.editingMaintenance = maintenance;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingMaintenance = null;
  }

  onFormSaved(): void {
    this.closeForm();
    this.loadMaintenances();
  }

  deleteMaintenance(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta previsão?')) {
      this.upcomingMaintenanceService.delete(this.vehicleId, id).subscribe({
        next: () => {
          this.loadMaintenances();
        },
        error: (err: any) => {
          alert(err.error?.title || 'Erro ao excluir previsão.');
        }
      });
    }
  }
}
