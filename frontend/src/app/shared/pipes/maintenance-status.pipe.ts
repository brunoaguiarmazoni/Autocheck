import { Pipe, PipeTransform } from '@angular/core';
import { UpcomingMaintenance } from '../models/upcoming-maintenance.model';

@Pipe({
  name: 'maintenanceStatus',
  standalone: true
})
export class MaintenanceStatusPipe implements PipeTransform {
  transform(maintenance: UpcomingMaintenance, currentMileageParam?: number): 'atrasada' | 'próxima' | 'regular' {
    if (!maintenance) return 'regular';

    let isAtrasada = false;
    let isProxima = false;

    // Evaluate date
    if (maintenance.targetDate) {
      const targetDate = new Date(maintenance.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const next30Days = new Date(today);
      next30Days.setDate(today.getDate() + 30);

      if (targetDate < today) {
        isAtrasada = true;
      } else if (targetDate <= next30Days) {
        isProxima = true;
      }
    }

    // Evaluate mileage
    const currentMileage = currentMileageParam ?? maintenance.vehicle?.currentMileage;
    if (maintenance.targetMileage !== null && maintenance.targetMileage !== undefined && currentMileage !== undefined) {
      if (currentMileage >= maintenance.targetMileage) {
        isAtrasada = true;
      } else if (maintenance.targetMileage - currentMileage <= 1000) {
        isProxima = true;
      }
    }

    if (isAtrasada) return 'atrasada';
    if (isProxima) return 'próxima';
    return 'regular';
  }
}
