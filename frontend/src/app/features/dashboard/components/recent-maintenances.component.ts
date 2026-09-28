import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-maintenances',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-surface-container-low rounded-xl border border-outline-variant p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform duration-250 hover:-translate-y-1">
      <h3 class="text-xl font-semibold text-text-primary mb-6">Últimas Manutenções</h3>
      <ul class="divide-y divide-outline-variant" *ngIf="maintenances && maintenances.length > 0; else noData">
        <li *ngFor="let m of maintenances" class="py-4 flex justify-between items-center">
          <div>
            <p class="font-medium text-text-primary text-lg">{{ m.type }}</p>
            <p class="text-sm text-text-secondary mt-1">{{ m.date | date:'dd/MM/yyyy' }}</p>
          </div>
          <span class="font-semibold text-text-primary text-lg">{{ m.cost | currency:'BRL' }}</span>
        </li>
      </ul>
      <ng-template #noData>
        <p class="text-text-secondary text-base">Nenhuma manutenção recente encontrada.</p>
      </ng-template>
    </div>
  `
})
export class RecentMaintenancesComponent {
  @Input() maintenances: any[] = [];
}
