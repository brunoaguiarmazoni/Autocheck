import { MaintenanceListComponent } from './maintenance-list.component';
import { describe, it, expect, vitest, beforeEach } from 'vitest';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('MaintenanceListComponent', () => {
  let component: MaintenanceListComponent;
  let maintenanceServiceSpy: any;

  beforeEach(() => {
    maintenanceServiceSpy = {
      listByVehicle: vitest.fn()
    };
    component = new MaintenanceListComponent(maintenanceServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
