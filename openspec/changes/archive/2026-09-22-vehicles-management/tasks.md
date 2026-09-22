# Tasks

## 1. Banco de Dados e Prisma

- [x] 1.1 Atualizar `backend/prisma/schema.prisma` com o model `Vehicle` e suas relações (`User`).
- [x] 1.2 Executar `npx prisma migrate dev --name add_vehicle_model` no backend para criar a tabela.
- [x] 1.3 Executar `npx prisma generate` para atualizar o Prisma Client.

## 2. Backend - API (CRUD de Veículos)

- [x] 2.1 Criar `backend/src/models/Vehicle.ts` (ou as interfaces, se for o padrão).
- [x] 2.2 Criar `backend/src/repositories/vehicleRepository.ts` para persistência via Prisma.
- [x] 2.3 Criar `backend/src/services/vehicleService.ts` aplicando as regras de negócio:
  - Validar e associar o veículo ao `userId`.
  - Garantir proteção contra IDOR nas operações de update e delete (validar dono).
- [x] 2.4 Criar testes unitários para `vehicleService.ts` (Happy Path, Sad Path, e Edge Cases: erro de acesso/IDOR).
- [x] 2.5 Criar `backend/src/controllers/vehicleController.ts` integrando com o service. Retornar os códigos apropriados (200, 201, 403, 404) e adotar o padrão de RFC 7807 (Problem Details).
- [x] 2.6 Criar as rotas em `backend/src/routes/vehicleRoutes.ts`, protegendo com o middleware de autenticação.
- [x] 2.7 Criar testes de integração validando o comportamento de cada rota (`/api/v1/vehicles`).

## 3. Frontend - Angular (Gestão de Veículos)

- [x] 3.1 Criar a interface/model `Vehicle` no frontend (`frontend/src/app/shared/models/vehicle.model.ts`).
- [x] 3.2 Criar o serviço Angular `VehicleService` (`frontend/src/app/core/services/vehicle.service.ts`) usando `HttpClient`.
- [x] 3.3 Criar testes unitários para o `VehicleService`.
- [x] 3.4 Gerar o módulo/componentes da feature de veículos:
  - `VehicleListComponent`: lista os veículos.
  - `VehicleFormComponent`: formulário reativo para criar/editar.
- [x] 3.5 Implementar a comunicação entre os componentes e o serviço, lidando com os retornos e exibições de erro.
- [x] 3.6 Criar testes E2E com Playwright para os fluxos de listagem, cadastro e edição.

## 4. Revisão e Refinamento

- [x] 4.1 Rodar o lint em todo o monorepo (`npm run lint`).
- [x] 4.2 Rodar os testes (unitários, integração e E2E) e garantir a cobertura mínima exigida.
- [x] 4.3 Preencher a "Reflexão pós-mudança" de acordo com o AGENTS.md.
