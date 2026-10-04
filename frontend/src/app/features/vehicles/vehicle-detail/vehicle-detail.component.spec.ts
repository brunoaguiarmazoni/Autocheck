import { VehicleDetailComponent } from './vehicle-detail.component';
import { describe, it, expect, vitest, beforeEach } from 'vitest';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('VehicleDetailComponent', () => {
  let component: VehicleDetailComponent;
  let vehicleServiceSpy: any;
  let routeSpy: any;

  beforeEach(() => {
    vehicleServiceSpy = {
      getVehicleById: vitest.fn()
    };
    routeSpy = {
      snapshot: { paramMap: { get: vitest.fn() } }
    };
    component = new VehicleDetailComponent(routeSpy, vehicleServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
