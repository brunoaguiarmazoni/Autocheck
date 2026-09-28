# Proposal: Upcoming Maintenances

## Why

Usuários precisam se planejar para manutenções futuras em seus veículos, seja por tempo (data) ou por uso (quilometragem). Esta funcionalidade permite o cadastro de alertas, ajudando os proprietários a não perderem os prazos de serviços preventivos, o que aumenta a segurança e a vida útil dos veículos.

## What Changes

- Criação de um novo modelo no banco de dados (`UpcomingMaintenance`) para armazenar alertas previstos (vinculados ao veículo).
- Criação de endpoints de API para o CRUD completo dessas previsões.
- Adição de uma nova aba no detalhe do veículo no frontend para gerenciar essas manutenções (junto a 'Detalhes' e 'Manutenções').
- Criação de um Painel (Dashboard) global no frontend para listar as próximas manutenções de todos os veículos do usuário.
- Inclusão de avisos visuais no frontend (ex: cor vermelha/amarela) para indicar manutenções que estão atrasadas ou prestes a vencer.

## Capabilities

### New Capabilities
- `upcoming-maintenances`: Gestão de previsões e alertas de manutenção baseados em data e/ou quilometragem, bem como a sua exibição em painel global e avisos de status.

### Modified Capabilities
(none)

## Impact

- **Banco de Dados**: Nova tabela via Prisma migration.
- **Backend**: Novos controllers, services e repositórios na rota `/api/v1/vehicles/:vehicleId/upcoming-maintenances` e um endpoint global `/api/v1/upcoming-maintenances`. A lógica deve garantir restrição por usuário (middleware JWT) contra vazamentos (IDOR).
- **Frontend Angular**: Criação de componentes novos e atualização do `vehicle-detail`. O frontend lidará com as flags visuais baseando-se nos dados do backend.
- **Testes**: Adição de testes unitários para a camada de serviços (cobrindo filtros de data/km), testes de integração na nova rota, e testes E2E com Playwright para o fluxo de cadastro e visualização no Dashboard. Linter continuará sendo validado obrigatoriamente.
