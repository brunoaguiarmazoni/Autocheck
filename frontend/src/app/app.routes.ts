import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { VehicleListComponent } from './features/vehicles/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './features/vehicles/vehicle-form/vehicle-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'vehicles', component: VehicleListComponent, canActivate: [authGuard] },
  { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [authGuard] },
  { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' }
];
