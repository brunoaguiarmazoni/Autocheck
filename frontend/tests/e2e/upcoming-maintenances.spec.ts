import { test, expect } from './fixtures';

test.describe('Upcoming Maintenances', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to empty page to enable localStorage
    await page.goto('/');

    // Mock user profile
    await page.evaluate(() => {
      window.localStorage.setItem('autocheck_token', 'fake-jwt-token');
      window.localStorage.setItem('autocheck_user', JSON.stringify({
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      }));
    });

    // Mock Vehicle Details API
    await page.route('**/api/v1/vehicles/1', async route => {
      const json = {
        id: '1',
        brand: 'Honda',
        model: 'Civic',
        year: 2020,
        licensePlate: 'XYZ-9876',
        currentMileage: 50000,
        userId: 'user-123'
      };
      await route.fulfill({ json });
    });

    // Mock Upcoming Maintenances for Vehicle 1
    await page.route('**/api/v1/vehicles/1/upcoming-maintenances', async route => {
      if (route.request().method() === 'GET') {
        const json = [
          {
            id: 'um1',
            vehicleId: '1',
            description: 'Troca de pastilha de freio',
            targetDate: '2023-01-01T00:00:00.000Z', // Past date -> atrasada
            targetMileage: 55000,
            vehicle: {
              brand: 'Honda',
              model: 'Civic',
              licensePlate: 'XYZ-9876'
            }
          }
        ];
        await route.fulfill({ json });
      } else if (route.request().method() === 'POST') {
        const json = {
          id: 'um2',
          vehicleId: '1',
          description: 'Alinhamento',
          targetDate: '2030-01-01T00:00:00.000Z',
          targetMileage: null
        };
        await route.fulfill({ status: 201, json });
      } else {
        await route.continue();
      }
    });

    // Mock Global Upcoming Maintenances for Dashboard
    await page.route('**/api/v1/upcoming-maintenances', async route => {
      if (route.request().method() === 'GET') {
        const json = [
          {
            id: 'um1',
            vehicleId: '1',
            description: 'Troca de pastilha de freio',
            targetDate: '2023-01-01T00:00:00.000Z', // Past date -> atrasada
            targetMileage: 55000,
            vehicle: {
              brand: 'Honda',
              model: 'Civic',
              licensePlate: 'XYZ-9876'
            }
          }
        ];
        await route.fulfill({ json });
      } else {
        await route.continue();
      }
    });
  });

  test('deve listar previsões e exibir label de atraso na aba de veículo', async ({ page }) => {
    await page.goto('/vehicles/1');
    
    // Clicar na aba Previsões
    await page.locator('button', { hasText: 'Previsões' }).click();

    // Título da lista
    await expect(page.locator('h2', { hasText: 'Previsões de Manutenção' })).toBeVisible();

    // Item mockado exibido
    await expect(page.locator('td', { hasText: 'Troca de pastilha de freio' })).toBeVisible();
    
    // Status de Atrasada
    await expect(page.locator('span', { hasText: 'Atrasada' })).toBeVisible();
  });

  test('deve abrir o formulário para adicionar previsão e submeter', async ({ page }) => {
    await page.goto('/vehicles/1');
    await page.locator('button', { hasText: 'Previsões' }).click();

    // Botão Nova Previsão
    await page.locator('button', { hasText: 'Nova Previsão' }).click();

    // Modal visível
    await expect(page.locator('h3', { hasText: 'Nova Previsão' })).toBeVisible();

    // Preencher campos
    await page.fill('input[formControlName="description"]', 'Alinhamento');
    await page.fill('input[formControlName="targetDate"]', '2030-10-10');

    // Salvar
    await page.locator('button', { hasText: 'Salvar' }).click();

    // Deve fechar o modal
    await expect(page.locator('h3', { hasText: 'Nova Previsão' })).toBeHidden();
  });

  test('deve exibir alertas de manutenção no dashboard global', async ({ page }) => {
    await page.goto('/dashboard');

    // Título da página
    await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();

    // Verificar exibição da previsão mockada
    await expect(page.locator('app-upcoming-maintenances')).toContainText('Troca de pastilha de freio');
    
    // Verificar status na tabela do dashboard
  });
});
