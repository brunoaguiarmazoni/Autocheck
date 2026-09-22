import { test, expect } from '@playwright/test';

test.describe('Vehicles', () => {
  test('deve renderizar a tela de listagem de veículos', async ({ page }) => {
    // Navigate to the vehicles list page
    await page.goto('/vehicles');
    
    // Check if the title is present
    await expect(page.locator('h1', { hasText: 'Meus Veículos' })).toBeVisible();
    
    // Check if the add vehicle link is present
    await expect(page.locator('a', { hasText: 'Novo Veículo' })).toBeVisible();
  });
  
  test('deve renderizar o formulário de cadastro de veículo', async ({ page }) => {
    // Navigate to the add vehicle page
    await page.goto('/vehicles/new');
    
    // Check if the form is present
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[formControlName="brand"]')).toBeVisible();
    await expect(page.locator('input[formControlName="model"]')).toBeVisible();
    await expect(page.locator('input[formControlName="year"]')).toBeVisible();
    await expect(page.locator('input[formControlName="licensePlate"]')).toBeVisible();
    await expect(page.locator('input[formControlName="currentMileage"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
