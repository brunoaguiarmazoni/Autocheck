# Tasks

## 1. Backend - Agregação de Dados

- [ ] 1.1 Implementar a camada de serviço `dashboard.service.ts` com a lógica para agregar os dados do veículo, manutenções e gastos via Prisma. Verificar rodando testes unitários (Vitest) para o Happy Path, Sad Path (veículo sem registros) e Edge Cases.
- [ ] 1.2 Implementar o controller `dashboard.controller.ts` no endpoint `/api/v1/vehicles/:vehicleId/summary`. Verificar se a rota retorna HTTP 200 com os dados agregados, testando via integração (Vitest).
- [ ] 1.3 Adicionar a nova rota no backend protegida por autenticação. Testar acesso negado (401) sem token.

## 2. Frontend - Integração e Visualização

- [ ] 2.1 Criar o `DashboardService` no Angular para consumir o novo endpoint `/summary`. Verificar com testes unitários (HttpClientTestingModule).
- [ ] 2.2 Desenvolver os Dumb Components (`UpcomingMaintenances`, `RecentMaintenances`, `VehicleStats`) para exibição dos painéis. Verificar renderização com testes de componente.
- [ ] 2.3 Implementar o Smart Component `DashboardComponent` para orquestrar os dados recebidos do serviço e passar aos componentes filhos. Verificar comportamento com testes unitários.
- [ ] 2.4 Configurar a rota `/dashboard` no `app-routing.module.ts`. Testar navegação correta.

## 3. Testes Finais e Qualidade

- [ ] 3.1 Criar e executar teste E2E (Playwright) verificando o fluxo onde o usuário acessa o dashboard e visualiza as métricas e históricos.
- [ ] 3.2 Rodar `npm run lint` no monorepo para garantir que não há infrações de estilo ou regras do ESLint.
