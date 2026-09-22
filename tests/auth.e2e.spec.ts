import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
  const randomEmail = `testuser${Date.now()}@example.com`;
  const password = 'password123';

  test('should register a new user successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/register');
    
    await page.fill('input[formControlName="name"]', 'Playwright User');
    await page.fill('input[formControlName="email"]', randomEmail);
    await page.fill('input[formControlName="password"]', password);
    
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should login successfully with created user', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/login');
    
    await page.fill('input[formControlName="email"]', randomEmail);
    await page.fill('input[formControlName="password"]', password);
    
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });
});
