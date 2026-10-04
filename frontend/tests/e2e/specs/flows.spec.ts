import { test, expect } from '../fixtures';

// spec: openspec/specs/dashboard/test-plan.md
// seed: frontend/tests/e2e/dashboard.spec.ts
test.describe('Dashboard', () => {
  test.describe('1. Consulta de Resumo do Veículo e Renderização', () => {
    test('Veículo com histórico', async ({ page }) => {
      // Mock the API responses
      await page.route('**/api/v1/vehicles', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ id: 'v1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 50000 }]) });
      });
      await page.route('**/api/v1/vehicles/v1/summary', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ vehicle: { id: 'v1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 50000 }, recentMaintenances: [{ type: 'Oil Change', date: '2026-10-10', cost: 150 }], upcomingMaintenances: [{ description: 'Troca de Pneus', targetDate: '2026-12-01' }], totalExpenses: 150 }) });
      });

      // 1. Acessar a aplicação e navegar até o Dashboard (Painel de Resumo).
      await page.goto('/dashboard');
      
      // 2. Selecionar o veículo alvo, caso o usuário tenha mais de um.
      // 3. Verificar a exibição do resumo do veículo, aguardando a finalização da carga dos dados.
      await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();
      await expect(page.locator('app-vehicle-stats')).toContainText('Toyota Corolla');
      await expect(page.locator('app-upcoming-maintenances')).toContainText('Troca de Pneus');
      await expect(page.locator('app-recent-maintenances')).toContainText('Oil Change');
    });

    test('Veículo sem histórico', async ({ page }) => {
      // Mock the API responses
      await page.route('**/api/v1/vehicles', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ id: 'v2', brand: 'Ford', model: 'Fiesta', year: 2015, licensePlate: 'XYZ-9876', currentMileage: 10000 }]) });
      });
      await page.route('**/api/v1/vehicles/v2/summary', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ vehicle: { id: 'v2', brand: 'Ford', model: 'Fiesta', year: 2015, licensePlate: 'XYZ-9876', currentMileage: 10000 }, recentMaintenances: [], upcomingMaintenances: [], totalExpenses: 0 }) });
      });

      // 1. Acessar a aplicação e navegar até o Dashboard.
      await page.goto('/dashboard');
      
      // 2. Selecionar o veículo sem histórico.
      // 3. Verificar os componentes renderizados.
      await expect(page.locator('app-recent-maintenances')).toContainText('Nenhuma manutenção recente encontrada.');
    });
  });
});

// spec: openspec/specs/maintenance-records/test-plan.md
// seed: frontend/tests/e2e/maintenances.spec.ts
test.describe('Registros de Manutenção', () => {
  test.describe('1. CRUD de registros de manutenção', () => {
    test('Criar registro de manutenção com sucesso', async ({ page }) => {
      await page.route('**/api/v1/vehicles/1', async route => {
        await route.fulfill({ status: 200, json: { id: '1', brand: 'Fiat', model: 'Uno' } });
      });
      await page.route('**/api/v1/vehicles/1/maintenances', async route => {
        if (route.request().method() === 'POST') await route.fulfill({ status: 201, json: {} });
        else await route.fulfill({ status: 200, json: { data: [], totalCost: 0 } });
      });

      // 1. Navegar até a tela do histórico do veículo desejado e clicar em "Adicionar Manutenção".
      await page.goto('/vehicles/1');
      await page.locator('button', { hasText: 'Manutenções' }).click();
      await page.locator('button', { hasText: 'Nova Manutenção' }).click();

      // 2. Preencher os campos obrigatórios (data, tipo do serviço, custo, descrição).
      await page.fill('input[formControlName="date"]', '2026-10-10');
      await page.selectOption('select[formControlName="type"]', 'Corretiva');
      await page.fill('input[formControlName="cost"]', '150');
      await page.fill('textarea[formControlName="description"]', 'Troca de óleo sintético');

      // 3. Clicar em salvar.
      await page.locator('button', { hasText: 'Salvar' }).click();

      // O registro é salvo e a nova manutenção aparece na lista.
      await expect(page.locator('h3', { hasText: 'Nova Manutenção' })).toBeHidden();
    });

    test('Listar manutenções de um veículo', async ({ page }) => {
      await page.route('**/api/v1/vehicles/1', async route => {
        await route.fulfill({ status: 200, json: { id: '1', brand: 'Fiat', model: 'Uno' } });
      });
      await page.route('**/api/v1/vehicles/1/maintenances', async route => {
        await route.fulfill({ status: 200, json: { data: [{ id: 'm1', type: 'Troca de Óleo', cost: 150, date: '2026-10-10' }], totalCost: 150 } });
      });

      // 1. Navegar para o histórico/lista de manutenções do veículo.
      await page.goto('/vehicles/1');
      await page.locator('button', { hasText: 'Manutenções' }).click();

      // A interface exibe todos os registros
      await expect(page.locator('table')).toBeVisible();
    });
  });

  test.describe('2. Totalização de gastos com manutenção', () => {
    test('Obter total de gastos', async ({ page }) => {
      await page.route('**/api/v1/vehicles/1', async route => {
        await route.fulfill({ status: 200, json: { id: '1', brand: 'Fiat', model: 'Uno' } });
      });
      await page.route('**/api/v1/vehicles/1/maintenances', async route => {
        await route.fulfill({ status: 200, json: { data: [{ id: 'm1', type: 'Preventiva', cost: 150 }], totalCost: 150 } });
      });

      // 1. Navegar para a aba de resumo de gastos ou painel do veículo em questão.
      await page.goto('/vehicles/1');
      await page.locator('button', { hasText: 'Manutenções' }).click();

      // O sistema exibe o custo consolidado
      await expect(page.locator('tfoot')).toContainText('Custo Total');
    });
  });
});

// spec: openspec/specs/upcoming-maintenances/test-plan.md
// seed: frontend/tests/e2e/upcoming-maintenances.spec.ts
test.describe('Manutenções Previstas', () => {
  test.describe('1. CRUD de Manutenções Previstas', () => {
    test('Criar alerta por data e quilometragem', async ({ page }) => {
      await page.route('**/api/v1/vehicles/1', async route => {
        await route.fulfill({ status: 200, json: { id: '1', brand: 'Honda', model: 'Civic' } });
      });
      await page.route('**/api/v1/vehicles/1/upcoming-maintenances', async route => {
        if (route.request().method() === 'POST') await route.fulfill({ status: 201, json: {} });
        else await route.fulfill({ status: 200, json: [] });
      });

      // 1. Navegar para a seção de Manutenções Previstas e clicar em criar alerta.
      await page.goto('/vehicles/1');
      await page.locator('button', { hasText: 'Previsões' }).click();
      await page.locator('button', { hasText: 'Nova Previsão' }).click();

      // 2. Selecionar o veículo correspondente.
      // 3. Inserir uma "data limite" e/ou uma "quilometragem alvo" e uma descrição para o alerta.
      await page.fill('input[formControlName="targetDate"]', '2026-12-01');
      await page.fill('input[formControlName="description"]', 'Revisão 50k');

      // 4. Clicar em salvar.
      await page.locator('button', { hasText: 'Salvar' }).click();

      // O alerta é criado
      await expect(page.locator('h3', { hasText: 'Nova Previsão' })).toBeHidden();
    });
  });

  test.describe('2. Painel Global de Manutenções Previstas', () => {
    test('Listar manutenções globais do usuário', async ({ page }) => {
      await page.route('**/api/v1/upcoming-maintenances', async route => {
        await route.fulfill({ status: 200, json: [{ id: 'um1', description: 'Revisão Global' }] });
      });
      await page.route('**/api/v1/vehicles', async route => {
        await route.fulfill({ status: 200, json: [{id: 'v1', brand: 'Honda', model: 'Civic', licensePlate: 'XYZ-1234'}] });
      });
      await page.route('**/api/v1/vehicles/*/summary', async route => {
        await route.fulfill({ status: 200, json: { vehicle: { id: 'v1' }, recentMaintenances: [], upcomingMaintenances: [{ description: 'Revisão Global' }], totalExpenses: 0 } });
      });

      // 1. Acessar o Dashboard Global de Manutenções Previstas.
      await page.goto('/dashboard');

      // São listados alertas de todos os veículos
      await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();
      await expect(page.locator('app-upcoming-maintenances')).toContainText('Revisão Global');
    });
  });
});

// spec: openspec/specs/vehicles-management/test-plan.md
// seed: frontend/tests/e2e/vehicles.spec.ts
test.describe('Gerenciamento de Veículos', () => {
  test.describe('1. Cadastro de Veículo', () => {
    test('Cadastro com sucesso', async ({ page }) => {
      await page.route('**/api/v1/vehicles', async route => {
        if (route.request().method() === 'POST') await route.fulfill({ status: 201, json: {} });
        else await route.fulfill({ status: 200, json: [{ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 40000 }] });
      });

      // 1. Navegar até a lista de veículos e acionar a criação de um novo veículo.
      await page.goto('/vehicles');
      await page.locator('a', { hasText: 'Novo Veículo' }).click();

      // 2. Preencher os dados: marca, modelo, ano, placa e quilometragem atual.
      await page.fill('input[formControlName="brand"]', 'Toyota');
      await page.fill('input[formControlName="model"]', 'Corolla');
      await page.fill('input[formControlName="year"]', '2020');
      await page.fill('input[formControlName="licensePlate"]', 'ABC-1234');
      await page.fill('input[formControlName="currentMileage"]', '40000');

      // 3. Submeter formulário.
      await page.click('button[type="submit"]');

      // Veículo é adicionado na listagem
      await expect(page.locator('text=Corolla').first()).toBeVisible();
    });

    test('Dados incompletos', async ({ page }) => {
      // 1. Tentar criar um veículo deixando a placa ou marca em branco.
      await page.goto('/vehicles/new');
      
      // 2. Submeter formulário.
      await page.click('button[type="submit"]');

      // Mensagens de erro de validação informam quais campos são obrigatórios.
      await expect(page.locator('text=Obrigatório').first()).toBeVisible();
    });
  });

  test.describe('2. Consulta de Veículos', () => {
    test('Listagem de veículos próprios', async ({ page }) => {
      await page.route('**/api/v1/vehicles', async route => {
        await route.fulfill({ status: 200, json: [{ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 40000 }] });
      });

      // 1. Acessar a página principal de "Meus Veículos".
      await page.goto('/vehicles');
      
      // O usuário visualiza apenas os carros que cadastrou
      await expect(page.locator('h3', { hasText: 'Toyota Corolla' }).first()).toBeVisible();
    });
  });

  test.describe('3. Atualização de Veículo', () => {
    test('Atualização com sucesso', async ({ page }) => {
      await page.route('**/api/v1/vehicles', async route => {
        await route.fulfill({ status: 200, json: [{ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 40000 }] });
      });
      await page.route('**/api/v1/vehicles/1', async route => {
        if (route.request().method() === 'PUT') await route.fulfill({ status: 200, json: {} });
        else await route.fulfill({ status: 200, json: { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 40000 } });
      });

      // 1. Entrar na edição do veículo.
      await page.goto('/vehicles');
      await page.locator('a', { hasText: 'Editar' }).first().click();

      // 2. Alterar a placa ou atualizar a quilometragem atual.
      await page.fill('input[formControlName="currentMileage"]', '41000');

      // 3. Salvar as edições.
      await page.locator('button', { hasText: 'Salvar' }).click();

      // O registro é atualizado e voltamos para a listagem
      await expect(page.locator('h3', { hasText: 'Toyota Corolla' }).first()).toBeVisible();
    });
  });

  test.describe('4. Exclusão de Veículo', () => {
    test('Exclusão com sucesso', async ({ page }) => {
      await page.route('**/api/v1/vehicles', async route => {
        await route.fulfill({ status: 200, json: [{ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 40000 }] });
      });
      await page.route('**/api/v1/vehicles/1', async route => {
        if (route.request().method() === 'DELETE') await route.fulfill({ status: 204 });
        else await route.continue();
      });

      page.on('dialog', dialog => dialog.accept());

      // 1. Clicar para deletar o veículo.
      await page.goto('/vehicles');
      // Supondo que exista um botão de deletar na listagem
      await page.locator('button', { hasText: 'Excluir' }).first().click();

      // O veículo some da listagem
      await expect(page.locator('h3', { hasText: 'Toyota Corolla' })).toBeHidden();
    });
  });
});
