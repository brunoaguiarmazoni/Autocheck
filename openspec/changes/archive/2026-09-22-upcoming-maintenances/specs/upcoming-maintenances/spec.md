# Spec Delta

## Purpose
Permite aos usuários planejar manutenções futuras para seus veículos com base em datas ou quilometragem, fornecendo alertas visuais sobre serviços próximos ou atrasados no painel do sistema.

## ADDED Requirements

### Requirement: CRUD de Manutenções Previstas
O sistema DEVE permitir a criação, leitura, atualização e exclusão de alertas de manutenção prevista associados a um veículo, garantindo que o usuário só possa acessar alertas de seus próprios veículos.

#### Scenario: Criar alerta por data e quilometragem
- **WHEN** o usuário cria uma manutenção prevista informando uma data limite ou uma quilometragem alvo para um veículo de sua propriedade
- **THEN** o sistema salva o alerta e retorna os dados cadastrados

#### Scenario: Acesso restrito
- **WHEN** um usuário tenta listar, editar ou excluir alertas de manutenção de um veículo que pertence a outro usuário
- **THEN** o sistema retorna um erro 403 (Forbidden) ou 404 (Not Found)

### Requirement: Painel Global de Manutenções Previstas
O sistema DEVE prover um endpoint que retorne todas as manutenções previstas de todos os veículos pertencentes ao usuário autenticado para alimentar um dashboard unificado.

#### Scenario: Listar manutenções globais do usuário
- **WHEN** o usuário solicita a listagem de suas manutenções previstas
- **THEN** o sistema retorna todos os alertas de todos os seus veículos, ordenados para priorizar os mais urgentes (menor data ou menor quilometragem alvo restante)

### Requirement: Indicadores de Status
O sistema DEVE indicar o status do alerta (como Atrasado ou Próximo), baseando-se na data/quilometragem alvo comparada com o estado atual do tempo ou do veículo.

#### Scenario: Manutenção atrasada
- **WHEN** a data da manutenção prevista for anterior à data atual ou a quilometragem alvo for menor ou igual à quilometragem atual do veículo
- **THEN** o sistema classifica a manutenção como Atrasada

#### Scenario: Manutenção próxima
- **WHEN** a data/quilometragem alvo estiver prestes a ser atingida dentro de uma margem predefinida
- **THEN** o sistema classifica a manutenção como Próxima a vencer
