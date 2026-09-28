# Design

## Context

O MVP requer a funcionalidade de planejamento de manutenções baseada em data ou quilometragem. As restrições de arquitetura impõem que o backend seja a fonte da verdade e as regras de negócio residam nos services, enquanto que cálculos puramente visuais (flags de status) podem ficar no frontend baseados em dados puros entregues pela API.

## Goals / Non-Goals

**Goals:**
- Criar a entidade `UpcomingMaintenance` atrelada a `Vehicle`.
- Disponibilizar endpoints para gestão das previsões por veículo.
- Disponibilizar endpoint global para recuperar alertas de todos os veículos de um usuário.
- Exibir abas na UI de detalhes do veículo e um novo dashboard global.
- Calcular no frontend se a previsão está atrasada, próxima ou em dia, para fornecer alertas visuais.

**Non-Goals:**
- Envio de notificações automáticas via email, push notifications ou SMS.
- Agendamento automático com oficinas (integração externa).
- Migração de manutenções previstas para manutenções realizadas automaticamente (o usuário terá que cadastrar a manutenção realizada manualmente no MVP).

## Decisions

**Decision 1: Modelo de Dados Flexível para Alvos**
- *Opção Escolhida*: A tabela `UpcomingMaintenance` terá colunas `targetDate` (opcional) e `targetMileage` (opcional).
- *Alternativa Considerada*: Criar tipos específicos para diferentes alertas (ex: AlertaData, AlertaKm).
- *Justificativa*: Manter em uma única tabela simplifica consultas, especialmente no painel global que precisa trazer todos os tipos de alerta juntos. A validação (backend) exigirá que ao menos um dos dois campos seja preenchido.

**Decision 2: Lógica de Status (Atrasado / Próximo) no Frontend**
- *Opção Escolhida*: O backend entregará a previsão (data/km) e os dados do veículo (km atual). O frontend fará a comparação matemática/data e definirá os status de exibição.
- *Alternativa Considerada*: O backend retornar um campo calculado `status` via API.
- *Justificativa*: A quilometragem atual do veículo pode ser atualizada por outras vias e o tempo é dinâmico. Fazer o cálculo da flag visual no frontend na hora da renderização reduz processamento no backend e garante atualização em tempo real sem novas requisições.

## Risks / Trade-offs

- **[Risco] Inconsistência na Quilometragem:** A quilometragem do veículo pode estar desatualizada, fazendo com que alertas baseados em km não disparem quando deveriam.
  - *Mitigação*: Exibir a "última quilometragem conhecida" junto aos alertas baseados em km no frontend, incentivando o usuário a atualizar o veículo.

- **[Risco] Alta complexidade no Dashboard global:** Buscar previsões de todos os veículos, especialmente se o usuário tiver muitos, pode ser custoso.
  - *Mitigação*: Como é o MVP e o número esperado de veículos por usuário é pequeno (1-5), uma query unificada filtrando via os veículos do usuário (`where { vehicle: { userId } }`) indexada adequadamente no banco será muito rápida.
