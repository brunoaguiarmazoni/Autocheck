import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p>Bem-vindo ao Autocheck!</p>
    </div>
  `,
})
export class DashboardComponent {}
