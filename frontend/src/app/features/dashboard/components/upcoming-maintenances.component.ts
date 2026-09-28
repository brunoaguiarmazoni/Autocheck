import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upcoming-maintenances',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-surface-container-low rounded-xl border border-outline-variant p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform duration-250 hover:-translate-y-1">
      <h3 class="text-xl font-semibold text-text-primary mb-6">Próximas Manutenções</h3>
      <ul class="divide-y divide-outline-variant" *ngIf="maintenances && maintenances.length > 0; else noData">
        <li *ngFor="let m of maintenances" class="py-4 flex justify-between">
          <div>
            <p class="font-medium text-text-primary text-lg">{{ m.description }}</p>
            <p class="text-sm text-text-secondary mt-1" *ngIf="m.targetDate">Previsão: {{ m.targetDate | date:'dd/MM/yyyy' }}</p>
            <p class="text-sm text-text-secondary mt-1" *ngIf="m.targetMileage">Aos: {{ m.targetMileage | number }} km</p>
          </div>
        </li>
      </ul>
      <ng-template #noData>
        <p class="text-text-secondary text-base">Nenhuma manutenção prevista.</p>
      </ng-template>
    </div>
  `
})
export class UpcomingMaintenancesComponent {
  @Input() maintenances: any[] = [];
}
