import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-surface-container-low rounded-xl border border-outline-variant p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform duration-250 hover:-translate-y-1">
      <h3 class="text-xl font-semibold text-text-primary mb-6">Informações do Veículo</h3>
      <div *ngIf="vehicle" class="space-y-4">
        <div class="flex justify-between border-b border-outline-variant pb-3">
          <span class="text-text-secondary tracking-wide">Veículo</span>
          <span class="font-medium text-text-primary">{{ vehicle.brand }} {{ vehicle.model }} ({{ vehicle.year }})</span>
        </div>
        <div class="flex justify-between border-b border-outline-variant pb-3">
          <span class="text-text-secondary tracking-wide">Placa</span>
          <span class="font-medium text-text-primary">{{ vehicle.licensePlate }}</span>
        </div>
        <div class="flex justify-between border-b border-outline-variant pb-3">
          <span class="text-text-secondary tracking-wide">Quilometragem</span>
          <span class="font-medium text-text-primary">{{ vehicle.currentMileage | number }} km</span>
        </div>
        <div class="flex justify-between pt-2">
          <span class="text-text-secondary tracking-wide">Gasto Total</span>
          <span class="font-semibold text-alert">{{ totalExpenses | currency:'BRL' }}</span>
        </div>
      </div>
    </div>
  `
})
export class VehicleStatsComponent {
  @Input() vehicle: any;
  @Input() totalExpenses: number = 0;
}
