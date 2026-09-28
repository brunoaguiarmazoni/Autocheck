# Spec Delta

## Purpose

Permite que os usuários registrem manutenções realizadas em seus veículos, consultem o histórico de serviços e acompanhem os gastos acumulados com a manutenção do veículo ao longo do tempo.

## ADDED Requirements

### Requirement: CRUD de registros de manutenção
O sistema DEVE permitir a criação, leitura, atualização e exclusão de registros de manutenção associados a um veículo, garantindo que o usuário só acesse manutenções dos veículos de sua propriedade.

#### Scenario: Criar registro de manutenção com sucesso
- **WHEN** o usuário envia os dados válidos de uma manutenção (data, tipo, custo, descrição) para um veículo de sua propriedade
- **THEN** o sistema salva o registro associado ao veículo e retorna os dados criados

#### Scenario: Listar manutenções de um veículo
- **WHEN** o usuário solicita o histórico de manutenções de um veículo que lhe pertence
- **THEN** o sistema retorna a lista de manutenções ordenadas da mais recente para a mais antiga

#### Scenario: Acesso não autorizado a veículo de outro usuário
- **WHEN** um usuário tenta criar ou ler registros de manutenção para um `vehicleId` pertencente a outro usuário
- **THEN** o sistema retorna erro 403 (Forbidden) ou 404 (Not Found)

### Requirement: Totalização de gastos com manutenção
O sistema DEVE calcular o total gasto com manutenções de um veículo com base no custo de cada registro criado, sem persistir uma entidade separada de "gastos".

#### Scenario: Obter total de gastos
- **WHEN** o usuário solicita o histórico de manutenções do veículo ou o resumo de gastos
- **THEN** o sistema agrega e retorna o custo total das manutenções daquele veículo
