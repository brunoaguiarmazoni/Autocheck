# Design

## Context

A aplicação precisa rastrear as manutenções dos veículos e calcular gastos. Conforme a restrição levantada, os gastos devem ser derivados do custo de cada manutenção registrada, não havendo entidade própria de "Gastos". A funcionalidade envolverá novas tabelas no Prisma, novos endpoints no backend, e telas no frontend.

## Goals / Non-Goals

**Goals:**
- Implementar entidade `Maintenance` no banco de dados, vinculada a `Vehicle`.
- Criar a camada de backend completa (Routes, Controller, Service, Repository) para o CRUD.
- Retornar o total gasto (agregado das manutenções) juntamente com a lista de registros.
- Garantir segurança (authorization) verificando que o veículo pertence ao usuário que faz a chamada.

**Non-Goals:**
- Tabela dedicada para Gastos.
- Upload de notas fiscais (anexos) ou integração com oficinas nesta etapa do MVP.

## Decisions

- **Modelo Prisma (`Maintenance`)**:
  - `id` (UUID)
  - `vehicleId` (Relacionamento com Vehicle)
  - `date` (DateTime)
  - `type` (String - preventiva, corretiva, etc.)
  - `cost` (Float ou Decimal)
  - `description` (String opcional)
  - *Rationale*: Representa os dados base mínimos. O custo servirá para totalização. Relacionamento Cascade com Vehicle para evitar órfãos.

- **Totalização no Backend**:
  - A API `/api/v1/vehicles/:vehicleId/maintenances` pode retornar um objeto com `data` (lista) e `totalCost` (soma).
  - *Rationale*: Evita que o frontend precise somar todos os registros de todas as páginas, e centraliza a regra de negócio (soma) na API.

## Risks / Trade-offs

- [Risk] Falta de integridade ao deletar veículo. → *Mitigation*: Uso de `onDelete: Cascade` no schema do Prisma para a relação Vehicle -> Maintenance.
- [Risk] Usuário acessando manutenções de terceiros. → *Mitigation*: O backend valida a posse do veículo (via Service `vehicleRepository.findById`) antes de listar/inserir manutenções.
