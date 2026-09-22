# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: vehicles.spec.ts >> Vehicles >> deve renderizar o formulário de cadastro de veículo
- Location: tests\e2e\vehicles.spec.ts:15:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/vehicles/new
Call log:
  - navigating to "http://localhost:3000/vehicles/new", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Vehicles', () => {
  4  |   test('deve renderizar a tela de listagem de veículos', async ({ page }) => {
  5  |     // Navigate to the vehicles list page
  6  |     await page.goto('/vehicles');
  7  |     
  8  |     // Check if the title is present
  9  |     await expect(page.locator('h1', { hasText: 'Meus Veículos' })).toBeVisible();
  10 |     
  11 |     // Check if the add vehicle link is present
  12 |     await expect(page.locator('a', { hasText: 'Novo Veículo' })).toBeVisible();
  13 |   });
  14 |   
  15 |   test('deve renderizar o formulário de cadastro de veículo', async ({ page }) => {
  16 |     // Navigate to the add vehicle page
> 17 |     await page.goto('/vehicles/new');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/vehicles/new
  18 |     
  19 |     // Check if the form is present
  20 |     await expect(page.locator('form')).toBeVisible();
  21 |     await expect(page.locator('input[formControlName="brand"]')).toBeVisible();
  22 |     await expect(page.locator('input[formControlName="model"]')).toBeVisible();
  23 |     await expect(page.locator('input[formControlName="year"]')).toBeVisible();
  24 |     await expect(page.locator('input[formControlName="licensePlate"]')).toBeVisible();
  25 |     await expect(page.locator('input[formControlName="currentMileage"]')).toBeVisible();
  26 |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  27 |   });
  28 | });
  29 | 
```