# Proposta: Registro e Histórico de Manutenção

## Escopo funcional
Implementação do CRUD de manutenções realizadas (RF-03 e RF-04) e a funcionalidade de controle e totalização de gastos derivados desses registros (RF-06). Inclui a interface do histórico e a API respectiva (`/api/v1/vehicles/{vehicleId}/maintenances`).

## Dependências
- vehicles-management

## Riscos
- **Médio:** Inconsistência de dados se uma exclusão de veículo não propagar ou se manutenções ficarem órfãs. Mitigado com exclusão em cascata configurada no Prisma e integridade referencial rigorosa.

## Execução de linter necessária
- Sim. `npm run lint` em todo o código adicionado.

## Testes unitários necessários
- Sim. Cobertura da regra de cálculo de gastos (sem entidade própria persistida, derivando do custo) e lógica de CRUD de manutenção no backend.

## Testes de integração necessários
- Sim. Testes da API, garantindo o filtro correto por `vehicleId` e bloqueio caso o veículo pertença a outro usuário.

## Testes E2E necessários
- Sim. Fluxos de inclusão e verificação do histórico e consulta de gastos com o Playwright no frontend.
