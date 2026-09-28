import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceService } from '../../../core/services/maintenance.service';
import { Maintenance } from '../../../shared/models/maintenance.model';
import { MaintenanceFormComponent } from '../maintenance-form/maintenance-form.component';

@Component({
  selector: 'app-maintenance-list',
  standalone: true,
  imports: [CommonModule, MaintenanceFormComponent],
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  @Input() vehicleId!: string;

  maintenances: Maintenance[] = [];
  totalCost: number = 0;
  loading = true;
  error = '';
  showForm = false;
  editingMaintenance: Maintenance | null = null;

  constructor(private maintenanceService: MaintenanceService) {}

  ngOnInit(): void {
    if (this.vehicleId) {
      this.loadMaintenances();
    }
  }

  loadMaintenances(): void {
    this.loading = true;
    this.maintenanceService.listByVehicle(this.vehicleId).subscribe({
      next: (response) => {
        this.maintenances = response.data;
        this.totalCost = response.totalCost;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.title || 'Erro ao carregar manutenções.';
        this.loading = false;
      }
    });
  }

  openNewForm(): void {
    this.editingMaintenance = null;
    this.showForm = true;
  }

  openEditForm(maintenance: Maintenance): void {
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
    if (confirm('Tem certeza que deseja excluir esta manutenção?')) {
      this.maintenanceService.delete(this.vehicleId, id).subscribe({
        next: () => {
          this.loadMaintenances();
        },
        error: (err) => {
          alert(err.error?.title || 'Erro ao excluir manutenção.');
        }
      });
    }
  }
}
