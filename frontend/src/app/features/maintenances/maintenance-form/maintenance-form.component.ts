import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaintenanceService } from '../../../core/services/maintenance.service';
import { Maintenance } from '../../../shared/models/maintenance.model';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit {
  @Input() vehicleId!: string;
  @Input() maintenance: Maintenance | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  maintenanceForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.maintenance) {
      this.populateForm();
    }
  }

  private initForm(): void {
    this.maintenanceForm = this.fb.group({
      date: ['', Validators.required],
      type: ['Preventiva', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  private populateForm(): void {
    if (this.maintenance) {
      // Format date to YYYY-MM-DD for date input
      let formattedDate = '';
      if (this.maintenance.date) {
        const d = new Date(this.maintenance.date);
        formattedDate = d.toISOString().split('T')[0];
      }
      
      this.maintenanceForm.patchValue({
        date: formattedDate,
        type: this.maintenance.type,
        cost: this.maintenance.cost,
        description: this.maintenance.description
      });
    }
  }

  onSubmit(): void {
    if (this.maintenanceForm.invalid) {
      this.maintenanceForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = this.maintenanceForm.value;
    // Format date string as iso string
    formData.date = new Date(formData.date).toISOString();

    const request$ = this.maintenance
      ? this.maintenanceService.update(this.vehicleId, this.maintenance.id, formData)
      : this.maintenanceService.create(this.vehicleId, formData);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.title || 'Erro ao salvar manutenção.';
      }
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
