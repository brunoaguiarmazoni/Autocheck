# vehicles-management Specification

## Purpose
Permite ao usuário cadastrar e gerenciar seus veículos, servindo de base para o acompanhamento das informações de manutenção e garantindo o isolamento de dados por usuário.

## Requirements

### Requirement: Cadastro de Veículo
O sistema SHALL permitir que um usuário autenticado cadastre um veículo informando marca, modelo, ano, placa e quilometragem atual.

#### Scenario: Cadastro com sucesso
- **WHEN** o usuário informa os dados válidos do veículo e salva
- **THEN** o sistema cadastra o veículo vinculado ao usuário e retorna sucesso

#### Scenario: Dados incompletos
- **WHEN** o usuário tenta salvar o veículo sem informar um campo obrigatório
- **THEN** o sistema recusa a requisição com um erro de validação (Problem Details)

### Requirement: Consulta de Veículos
O sistema SHALL retornar a lista de veículos pertencentes exclusivamente ao usuário autenticado.

#### Scenario: Listagem de veículos próprios
- **WHEN** o usuário acessa a listagem de veículos
- **THEN** o sistema exibe apenas os veículos cadastrados por este usuário

#### Scenario: Proteção contra IDOR na consulta
- **WHEN** o usuário tenta buscar um veículo pelo ID pertencente a outro usuário
- **THEN** o sistema retorna um erro de acesso negado ou não encontrado

### Requirement: Atualização de Veículo
O sistema SHALL permitir a alteração dos dados cadastrais e da quilometragem atual do veículo, desde que o veículo pertença ao usuário autenticado.

#### Scenario: Atualização com sucesso
- **WHEN** o usuário altera os dados de um veículo seu e salva
- **THEN** o sistema persiste as alterações e retorna sucesso

#### Scenario: Proteção contra IDOR na atualização
- **WHEN** o usuário tenta alterar os dados de um veículo de outro usuário
- **THEN** o sistema retorna erro de acesso negado ou não encontrado

### Requirement: Exclusão de Veículo
O sistema SHALL permitir a exclusão de um veículo de propriedade do usuário autenticado. A exclusão de um veículo acarreta a remoção de todas as manutenções associadas (comportamento que será verificado nas capacidades de manutenção, mas a exclusão deve ser garantida aqui).

#### Scenario: Exclusão com sucesso
- **WHEN** o usuário confirma a exclusão de um de seus veículos
- **THEN** o sistema remove o veículo e retorna sucesso

#### Scenario: Proteção contra IDOR na exclusão
- **WHEN** o usuário tenta excluir um veículo pertencente a outro usuário
- **THEN** o sistema retorna erro de acesso negado ou não encontrado
