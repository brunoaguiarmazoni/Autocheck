# Tasks

## 1. Banco de Dados e Modelagem

- [x] 1.1 Adicionar modelo `UpcomingMaintenance` no schema do Prisma relacionando com `Vehicle` (`onDelete: Cascade`), com campos `targetDate` e `targetMileage` opcionais, e verificar rodando `npx prisma format`.
- [x] 1.2 Gerar e aplicar migration do Prisma e verificar que a tabela foi criada no banco executando `npx prisma migrate dev`.
- [x] 1.3 Atualizar o Prisma Client rodando `npx prisma generate` e verificar a compilação do projeto.

## 2. Backend - Camada de Repositório

- [x] 2.1 Criar `upcoming-maintenance.repository.ts` implementando CRUD básico e busca por veículo. Verificar com testes unitários.
- [x] 2.2 Adicionar método de busca global no repositório (listar alertas por usuário agrupando veículos) e verificar com teste unitário (`npm test`).

## 3. Backend - Camada de Serviço e Validações

- [x] 3.1 Criar `upcoming-maintenance.service.ts` com regras de validação (exigir preenchimento de ao menos data ou km) e proteção de IDOR verificando posse do veículo. Verificar com testes unitários cobrindo Happy Path, Sad Path e Edge Cases.
- [x] 3.2 Implementar método no serviço para buscar as previsões globais do usuário e verificar o retorno correto através de testes unitários.

## 4. Backend - Camada de Controllers e Rotas

- [x] 4.1 Criar `upcoming-maintenance.controller.ts` para lidar com as requisições HTTP retornando formatações no padrão Problem Details. Verificar injeção de dependências.
- [x] 4.2 Configurar rotas em `/api/v1/vehicles/:vehicleId/upcoming-maintenances` e rota global em `/api/v1/upcoming-maintenances`, aplicando o middleware de autenticação JWT, e verificar funcionamento através de testes de integração via Vitest.

## 5. Frontend - Serviços e Modelos

- [x] 5.1 Adicionar a interface `UpcomingMaintenance` e criar o serviço Angular (`UpcomingMaintenanceService`) para consumir os novos endpoints, verificando compilação (`npm run build`).
- [x] 5.2 Implementar testes unitários para `UpcomingMaintenanceService` usando Jest e `HttpTestingController`, focando em todas as rotas (CRUD) e tratamento de erros.

## 6. Frontend - Lógica de Status e Interface do Veículo

- [x] 6.1 Adicionar função/pipe para calcular status da manutenção (atrasada, próxima, regular) baseando-se em date e mileage e verificar por testes unitários.
- [x] 6.2 Criar aba de "Previsões" (com listagem e formulário de cadastro/edição) dentro do componente `vehicle-detail`. Verificar validação dos campos no formulário e alertas visuais renderizados corretamente no navegador.

## 7. Frontend - Dashboard Global

- [x] 7.1 Criar componente para o Dashboard Global para exibir todos os alertas de todos os veículos. Verificar se a navegação, links e a ordenação visual funcionam localmente no navegador.

## 8. Qualidade e Verificação Final

- [x] 8.1 Criar teste E2E com Playwright cobrindo o cadastro de uma previsão, validação da label de atraso, e visualização no Dashboard. Verificar se o teste roda com sucesso (`npx playwright test`).
- [x] 8.2 Executar o linter geral do monorepo (`npm run lint`) no backend e frontend e corrigir quaisquer apontamentos.
