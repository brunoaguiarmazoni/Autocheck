# Design

## Context

O Dashboard exige uma visão consolidada de informações sobre um veículo (dados básicos, lista de manutenções recentes, manutenções futuras e total de gastos). A arquitetura atual utiliza Prisma ORM e PostgreSQL no backend, com Angular no frontend. O endpoint consolidará requisições para evitar N+1 requests do client.

## Goals / Non-Goals

**Goals:**
- Prover um endpoint único (`/api/v1/vehicles/:vehicleId/summary`) para retornar todos os dados necessários da página inicial do veículo de forma otimizada.
- Criar os componentes visuais correspondentes no frontend em Angular.

**Non-Goals:**
- Implementar paginação ou filtros complexos no dashboard. Apenas os registros mais recentes (ex: top 5 manutenções) serão retornados.

## Decisions

- **Agregação no Backend**: 
  - *Decisão*: O backend será responsável por consolidar os dados do Prisma, fazendo queries otimizadas em vez de o frontend buscar separadamente em endpoints diferentes.
  - *Rationale*: Reduz o volume de requisições de rede, melhorando o tempo de carregamento da página principal.
- **Isolamento de Componentes (Frontend)**: 
  - *Decisão*: O `DashboardComponent` atuará como um "Smart Component", que chama o serviço e distribui os dados para "Dumb Components" (ex: `UpcomingMaintenancesWidget`, `RecentMaintenancesWidget`).
  - *Rationale*: Aumenta a reusabilidade das partes visuais e facilita o teste unitário isolado.

## Risks / Trade-offs

- **Desempenho da Query de Gastos**: 
  - A query que calcula a soma de gastos pode ficar pesada caso haja muitos registros.
  - *Mitigação*: Utilizar o método `groupBy` ou `.aggregate` nativo do Prisma para que a soma ocorra diretamente no banco de dados e não em memória (Node.js).
