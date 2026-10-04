import { test, expect } from './fixtures';

test.describe('Maintenances', () => {
  // Configurando rota mockada para simular um veículo e suas manutenções
  test.beforeEach(async ({ page }) => {
    // Navigate to empty page on the origin to enable localStorage
    await page.goto('/');

    // Mock do perfil do usuário para o authGuard
    await page.evaluate(() => {
      window.localStorage.setItem('autocheck_token', 'fake-jwt-token');
      window.localStorage.setItem('autocheck_user', JSON.stringify({
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      }));
    });

    // Mock das requisições da API
    await page.route('**/api/v1/vehicles/1', async route => {
      const json = {
        id: '1',
        brand: 'Fiat',
        model: 'Uno',
        year: 2010,
        licensePlate: 'ABC-1234',
        currentMileage: 100000,
        userId: 'user-123'
      };
      await route.fulfill({ json });
    });

    await page.route('**/api/v1/vehicles/1/maintenances', async route => {
      if (route.request().method() === 'GET') {
        const json = {
          data: [
            {
              id: 'm1',
              vehicleId: '1',
              date: new Date().toISOString(),
              type: 'Preventiva',
              cost: 150.50,
              description: 'Troca de óleo'
            }
          ],
          totalCost: 150.50
        };
        await route.fulfill({ json });
      } else if (route.request().method() === 'POST') {
        const json = {
          id: 'm2',
          vehicleId: '1',
          date: new Date().toISOString(),
          type: 'Corretiva',
          cost: 300.00,
          description: 'Troca de bateria'
        };
        await route.fulfill({ status: 201, json });
      } else {
        await route.continue();
      }
    });

    await page.route('**/api/v1/vehicles/1/maintenances/m1', async route => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({ status: 204 });
      } else if (route.request().method() === 'PUT') {
        const json = {
          id: 'm1',
          vehicleId: '1',
          date: new Date().toISOString(),
          type: 'Preventiva',
          cost: 200.00,
          description: 'Troca de óleo e filtro'
        };
        await route.fulfill({ status: 200, json });
      } else {
        await route.continue();
      }
    });
  });

  test('deve renderizar a tela de detalhes do veículo com as abas', async ({ page }) => {
    await page.goto('/vehicles/1');
    
    // Verificar informações do veículo
    await expect(page.locator('h1', { hasText: 'Fiat Uno' })).toBeVisible();
    await expect(page.locator('text=ABC-1234').first()).toBeVisible();

    // Abas
    await expect(page.locator('button', { hasText: 'Detalhes' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Manutenções' })).toBeVisible();
  });

  test('deve listar manutenções e totalizador na aba correspondente', async ({ page }) => {
    await page.goto('/vehicles/1');
    
    // Clicar na aba Manutenções
    await page.locator('button', { hasText: 'Manutenções' }).click();

    // Título da lista
    await expect(page.locator('h2', { hasText: 'Histórico de Manutenções' })).toBeVisible();

    // Lista e itens
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('td', { hasText: 'Troca de óleo' })).toBeVisible();
    
    // Totalizador
    await expect(page.locator('tfoot')).toContainText('Custo Total');
    await expect(page.locator('tfoot')).toContainText('R$'); // R$ 150,50 ou similar
  });

  test('deve abrir o formulário para adicionar manutenção e submeter', async ({ page }) => {
    await page.goto('/vehicles/1');
    await page.locator('button', { hasText: 'Manutenções' }).click();

    // Botão Nova Manutenção
    await page.locator('button', { hasText: 'Nova Manutenção' }).click();

    // Modal visível
    await expect(page.locator('h3', { hasText: 'Nova Manutenção' })).toBeVisible();

    // Preencher campos
    await page.fill('input[formControlName="date"]', '2023-10-10');
    await page.selectOption('select[formControlName="type"]', 'Corretiva');
    await page.fill('input[formControlName="cost"]', '300');
    await page.fill('textarea[formControlName="description"]', 'Troca de bateria');

    // Salvar (pode ter 2 botões salvar/cancelar)
    await page.locator('button', { hasText: 'Salvar' }).click();

    // Deve fechar o modal e recarregar a lista (a api mockada já trata o post, mas a lista de retorno do GET continua sendo mockada como m1, para não complicar, basta checar se o modal sumiu)
    await expect(page.locator('h3', { hasText: 'Nova Manutenção' })).toBeHidden();
  });
});
