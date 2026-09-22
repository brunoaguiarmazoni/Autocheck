# Spec Delta

## Purpose
Fornece um painel centralizado (Dashboard) para visualizar o estado atual e o histórico resumido de um veículo, incluindo quilometragem, manutenções e gastos.

## ADDED Requirements

### Requirement: Consulta de Resumo do Veículo
O sistema SHALL fornecer um endpoint para agregar e retornar os dados principais de um veículo (dados básicos, últimas manutenções, manutenções previstas e total de gastos).

#### Scenario: Veículo com histórico
- **WHEN** o usuário solicita o resumo de um veículo com manutenções registradas
- **THEN** o sistema retorna os detalhes agregados com sucesso

#### Scenario: Veículo sem histórico
- **WHEN** o usuário solicita o resumo de um veículo recém-cadastrado
- **THEN** o sistema retorna os detalhes básicos, com as listas de manutenção e gastos vazias ou zeradas

### Requirement: Exibição do Dashboard
O frontend SHALL exibir uma interface consolidada que apresenta quilometragem atual, próximas manutenções, histórico recente e gastos.

#### Scenario: Renderização dos componentes
- **WHEN** os dados do resumo são recebidos do backend
- **THEN** a interface renderiza as seções correspondentes sem erros
