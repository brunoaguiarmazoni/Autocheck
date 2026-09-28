import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpcomingMaintenanceService } from '../../../core/services/upcoming-maintenance.service';
import { UpcomingMaintenance } from '../../../shared/models/upcoming-maintenance.model';

@Component({
  selector: 'app-upcoming-maintenance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upcoming-maintenance-form.component.html',
  styleUrls: ['./upcoming-maintenance-form.component.css']
})
export class UpcomingMaintenanceFormComponent implements OnInit {
  @Input() vehicleId!: string;
  @Input() maintenance: UpcomingMaintenance | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  maintenanceForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private upcomingMaintenanceService: UpcomingMaintenanceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.maintenance) {
      this.populateForm();
    }
  }

  private initForm(): void {
    this.maintenanceForm = this.fb.group({
      description: ['', Validators.required],
      targetDate: [''],
      targetMileage: ['', [Validators.min(0)]]
    });
  }

  private populateForm(): void {
    if (this.maintenance) {
      let formattedDate = '';
      if (this.maintenance.targetDate) {
        const d = new Date(this.maintenance.targetDate);
        formattedDate = d.toISOString().split('T')[0];
      }
      
      this.maintenanceForm.patchValue({
        description: this.maintenance.description,
        targetDate: formattedDate,
        targetMileage: this.maintenance.targetMileage
      });
    }
  }

  onSubmit(): void {
    if (this.maintenanceForm.invalid) {
      this.maintenanceForm.markAllAsTouched();
      return;
    }

    const formData = this.maintenanceForm.value;
    
    // Custom validation: at least one of targetDate or targetMileage must be provided
    if (!formData.targetDate && (formData.targetMileage === null || formData.targetMileage === undefined || formData.targetMileage === '')) {
      this.error = 'Você deve informar a data prevista ou a quilometragem prevista (ou ambos).';
      return;
    }

    this.loading = true;
    this.error = '';

    if (formData.targetDate) {
      formData.targetDate = new Date(formData.targetDate).toISOString();
    } else {
      formData.targetDate = null;
    }

    if (formData.targetMileage === '') {
      formData.targetMileage = null;
    }

    const request$ = this.maintenance
      ? this.upcomingMaintenanceService.update(this.vehicleId, this.maintenance.id, formData)
      : this.upcomingMaintenanceService.create(this.vehicleId, formData);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit();
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error?.title || 'Erro ao salvar previsão de manutenção.';
      }
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
