import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})
export class VehicleFormComponent implements OnInit {
  vehicleForm: FormGroup;
  isEditMode = false;
  vehicleId: string | null = null;
  loading = false;
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vehicleForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1886), Validators.max(new Date().getFullYear() + 1)]],
      licensePlate: ['', Validators.required],
      currentMileage: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    if (this.vehicleId) {
      this.isEditMode = true;
      this.loadVehicle(this.vehicleId);
    }
  }

  loadVehicle(id: string): void {
    this.loading = true;
    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehicle) => {
        this.vehicleForm.patchValue({
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          licensePlate: vehicle.licensePlate,
          currentMileage: vehicle.currentMileage
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar os dados do veículo.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = '';

    const vehicleData = this.vehicleForm.value;

    if (this.isEditMode && this.vehicleId) {
      this.vehicleService.updateVehicle(this.vehicleId, vehicleData).subscribe({
        next: () => {
          this.router.navigate(['/vehicles']);
        },
        error: () => {
          this.error = 'Erro ao atualizar veículo. Verifique os dados e tente novamente.';
          this.submitting = false;
        }
      });
    } else {
      this.vehicleService.createVehicle(vehicleData).subscribe({
        next: () => {
          this.router.navigate(['/vehicles']);
        },
        error: () => {
          this.error = 'Erro ao cadastrar veículo. Verifique os dados e tente novamente.';
          this.submitting = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.vehicleForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }
}
