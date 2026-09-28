import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentMaintenancesComponent } from './recent-maintenances.component';


describe('RecentMaintenancesComponent', () => {
  let component: RecentMaintenancesComponent;
  let fixture: ComponentFixture<RecentMaintenancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentMaintenancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentMaintenancesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty state when no maintenances provided', () => {
    component.maintenances = [];
    fixture.detectChanges();

    const textContent = fixture.debugElement.nativeElement.textContent;
    expect(textContent).toContain('Nenhuma manutenção recente encontrada');
  });

  it('should render list of maintenances', () => {
    component.maintenances = [
      { type: 'Oil Change', date: '2026-10-10', cost: 150 }
    ];
    fixture.detectChanges();

    const textContent = fixture.debugElement.nativeElement.textContent;
    expect(textContent).toContain('Oil Change');
  });
});
