import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let dashboardServiceSpy: any;
  let vehicleServiceSpy: any;

  beforeEach(() => {
    dashboardServiceSpy = {
      getSummary: vitest.fn()
    };
    vehicleServiceSpy = {
      getVehicles: vitest.fn()
    };

    component = new DashboardComponent(vehicleServiceSpy, dashboardServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles and select first one', () => {
    const mockVehicles = [{ id: 'v1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 50000 }];
    const mockSummary = { vehicle: mockVehicles[0], recentMaintenances: [], upcomingMaintenances: [], totalExpenses: 0 };
    
    vehicleServiceSpy.getVehicles.mockReturnValue(of(mockVehicles));
    dashboardServiceSpy.getSummary.mockReturnValue(of(mockSummary));
    
    component.ngOnInit();
    
    expect(vehicleServiceSpy.getVehicles).toHaveBeenCalled();
    expect(component.selectedVehicleId).toBe('v1');
    expect(dashboardServiceSpy.getSummary).toHaveBeenCalledWith('v1');
    expect(component.summary).toEqual(mockSummary);
  });
});
