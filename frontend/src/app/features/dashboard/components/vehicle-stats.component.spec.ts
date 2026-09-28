import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleStatsComponent } from './vehicle-stats.component';


describe('VehicleStatsComponent', () => {
  let component: VehicleStatsComponent;
  let fixture: ComponentFixture<VehicleStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleStatsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render vehicle information', () => {
    component.vehicle = { brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 50000 };
    component.totalExpenses = 1500;
    fixture.detectChanges();

    const textContent = fixture.debugElement.nativeElement.textContent;
    expect(textContent).toContain('Toyota Corolla (2020)');
    expect(textContent).toContain('ABC-1234');
    expect(textContent).toContain('50,000 km');
  });
});
