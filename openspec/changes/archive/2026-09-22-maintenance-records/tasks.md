# Tasks

## 1. Banco de Dados e Modelagem

- [x] 1.1 Adicionar modelo `Maintenance` no schema do Prisma relacionando com `Vehicle` (`onDelete: Cascade`) e verificar rodando `npx prisma format`.
- [x] 1.2 Gerar e aplicar migration do Prisma e verificar que a tabela foi criada no banco executando `npx prisma migrate dev`.
- [x] 1.3 Atualizar o Prisma Client rodando `npx prisma generate` e verificar que os tipos de TypeScript foram gerados sem erros.

## 2. Backend - Camada de Repositório

- [x] 2.1 Criar `maintenance.repository.ts` implementando CRUD básico e verificar testes unitários do repositório.
- [x] 2.2 Criar os métodos de agregação de gastos por veículo no repositório e verificar executando o teste unitário (`npm test`).

## 3. Backend - Camada de Serviço e Validações

- [x] 3.1 Criar `maintenance.service.ts` integrando a validação de propriedade do veículo via `vehicleRepository.findById` antes de qualquer alteração, e verificar com testes unitários (Happy, Sad e Edge cases).
- [x] 3.2 Implementar a lógica de listar manutenções agregando o total de gastos (`totalCost`) no serviço e verificar se o total é retornado corretamente via testes unitários.

## 4. Backend - Camada de Controllers e Rotas

- [x] 4.1 Criar `maintenance.controller.ts` para lidar com requisições HTTP (GET, POST, PUT, DELETE) e verificar que as respostas seguem o formato de erro Problem Details em caso de falhas.
- [x] 4.2 Criar as rotas em `/api/v1/vehicles/:vehicleId/maintenances` com os devidos middlewares de autenticação e verificar com chamadas simuladas nos testes de integração.

## 5. Frontend - Integração de API

- [x] 5.1 Criar a interface `Maintenance` nos models do Angular e o `MaintenanceService` consumindo os novos endpoints e verificar que ele compila sem erros (`npm run build`).

## 6. Frontend - UI

- [x] 6.1 Criar componente de listagem de manutenções com o totalizador de gastos (`totalCost`) exibido, e verificar se os dados aparecem renderizados usando mock local.
- [x] 6.2 Criar formulário (modal/página) para inserção/edição de nova manutenção e verificar as validações de campos obrigatórios no frontend.
- [x] 6.3 Ajustar componente de Veículos para incluir o link para o histórico de manutenção do veículo e verificar no navegador.

## 7. Verificação Final (Testes E2E e Linter)

- [x] 7.1 Criar teste E2E com Playwright cobrindo o fluxo completo: registrar manutenção, ver listagem, validar totalizador, editar e excluir. Verificar se o teste roda com sucesso (`npx playwright test`).
- [x] 7.2 Executar o linter (`npm run lint`) no backend e frontend e corrigir quaisquer apontamentos finais.
