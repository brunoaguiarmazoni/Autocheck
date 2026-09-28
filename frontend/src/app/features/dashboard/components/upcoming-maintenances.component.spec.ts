import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingMaintenancesComponent } from './upcoming-maintenances.component';


describe('UpcomingMaintenancesComponent', () => {
  let component: UpcomingMaintenancesComponent;
  let fixture: ComponentFixture<UpcomingMaintenancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingMaintenancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpcomingMaintenancesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty state', () => {
    component.maintenances = [];
    fixture.detectChanges();

    const textContent = fixture.debugElement.nativeElement.textContent;
    expect(textContent).toContain('Nenhuma manutenção prevista');
  });

  it('should render upcoming maintenances', () => {
    component.maintenances = [
      { description: 'Troca de Pneus', targetDate: '2026-12-01' }
    ];
    fixture.detectChanges();

    const textContent = fixture.debugElement.nativeElement.textContent;
    expect(textContent).toContain('Troca de Pneus');
  });
});
