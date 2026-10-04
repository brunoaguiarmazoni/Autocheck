import { MaintenanceFormComponent } from './maintenance-form.component';
import { FormBuilder } from '@angular/forms';
import { describe, it, expect, vitest, beforeEach } from 'vitest';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('MaintenanceFormComponent', () => {
  let component: MaintenanceFormComponent;
  let maintenanceServiceSpy: any;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    maintenanceServiceSpy = {
      create: vitest.fn(),
      update: vitest.fn()
    };
    formBuilder = new FormBuilder();
    component = new MaintenanceFormComponent(formBuilder, maintenanceServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
