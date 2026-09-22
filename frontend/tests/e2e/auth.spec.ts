import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('deve renderizar a tela de login', async ({ page }) => {
    // Navigate to the login page (assuming the route is /login)
    await page.goto('/login');
    
    // Check if the login form is present
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
  
  test('deve renderizar a tela de cadastro', async ({ page }) => {
    // Navigate to the register page (assuming the route is /register)
    await page.goto('/register');
    
    // Check if the register form is present
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[formControlName="name"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
