import { test, expect } from './fixtures';

test.describe('Dashboard', () => {
  test('deve renderizar a tela de dashboard corretamente', async ({ page }) => {
    // Mock the API responses
    await page.route('**/api/v1/vehicles', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 'v1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 50000 }
        ]),
      });
    });

    await page.route('**/api/v1/vehicles/v1/summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          vehicle: { id: 'v1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 50000 },
          recentMaintenances: [
            { type: 'Oil Change', date: '2026-10-10', cost: 150 }
          ],
          upcomingMaintenances: [
            { description: 'Troca de Pneus', targetDate: '2026-12-01' }
          ],
          totalExpenses: 150
        }),
      });
    });

    // Go to an unauthenticated page first to set localStorage
    await page.goto('/auth/login');
    await page.evaluate(() => {
      localStorage.setItem('autocheck_token', 'fake-token');
      localStorage.setItem('autocheck_user', JSON.stringify({ id: 'u1', name: 'Test User', email: 'test@test.com' }));
    });

    // Navigate to the dashboard page
    await page.goto('/dashboard');
    
    // Check if the title is present
    await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();
    
    // Check if the select is populated
    await expect(page.locator('select#vehicleSelect')).toBeVisible();

    // Check if vehicle stats are rendered
    await expect(page.locator('app-vehicle-stats')).toContainText('Toyota Corolla');
    await expect(page.locator('app-vehicle-stats')).toContainText('ABC-1234');

    // Check if upcoming maintenances are rendered
    await expect(page.locator('app-upcoming-maintenances')).toContainText('Troca de Pneus');

    // Check if recent maintenances are rendered
    await expect(page.locator('app-recent-maintenances')).toContainText('Oil Change');
  });
});
