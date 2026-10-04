# Plano de Testes E2E: Manutenções Previstas

## Visão Geral
Este plano documenta os testes para a funcionalidade de planejamento de manutenções futuras (`upcoming-maintenances`) e seus indicadores de status.

## 1. CRUD de Manutenções Previstas

### Cenário 1.1: Criar alerta por data e quilometragem
- **Objetivo:** Validar o cadastro de um alerta de serviço futuro baseado nos limitadores de data e KM.
- **Estado Inicial:** Usuário logado e proprietário do veículo.
- **Passos:**
  1. Navegar para a seção de Manutenções Previstas e clicar em criar alerta.
  2. Selecionar o veículo correspondente.
  3. Inserir uma "data limite" e/ou uma "quilometragem alvo" e uma descrição para o alerta.
  4. Clicar em salvar.
- **Resultado Esperado:** O alerta é criado, exibido na lista e notifica o usuário do sucesso do cadastro.

### Cenário 1.2: Acesso restrito
- **Objetivo:** Validar o bloqueio IDOR para manipulação de alertas alheios.
- **Estado Inicial:** Usuário logado e ID de veículo ou de alerta conhecido pertencente a terceiros.
- **Passos:**
  1. (Via interceptação ou URL manipulada) Tentar carregar, editar ou deletar a manutenção prevista de outro usuário.
- **Resultado Esperado:** O sistema rejeita o acesso (403/404) e a UI lida graciosamente com o erro de permissão.

## 2. Painel Global de Manutenções Previstas

### Cenário 2.1: Listar manutenções globais do usuário
- **Objetivo:** Confirmar que o usuário pode ver uma visão unificada de alertas cruzando seus vários veículos.
- **Estado Inicial:** Usuário logado possuindo dois ou mais veículos, ambos com alertas agendados de diferentes urgências.
- **Passos:**
  1. Acessar o Dashboard Global de Manutenções Previstas.
- **Resultado Esperado:** São listados alertas de todos os veículos do usuário, ordenados pelo quão urgente o alerta é (data mais próxima ou limite de KM mais perto de ser atingido aparecendo primeiro).

## 3. Indicadores de Status

### Cenário 3.1: Manutenção Atrasada
- **Objetivo:** Validar a correta classificação de alertas que ultrapassaram seu prazo ou limite.
- **Estado Inicial:** Usuário logado, possuindo um alerta onde a data limite é ontem ou a quilometragem alvo já foi ultrapassada pelo veículo.
- **Passos:**
  1. Acessar a lista de alertas ou dashboard.
- **Resultado Esperado:** O alerta é visualmente destacado como "Atrasado" na UI.

### Cenário 3.2: Manutenção Próxima
- **Objetivo:** Validar a classificação de alertas que estão na iminência de vencer.
- **Estado Inicial:** Usuário logado, possuindo alerta com margem predefinida para vencer (ex: vence em menos de 10 dias ou faltam poucos KM).
- **Passos:**
  1. Acessar a lista de alertas.
- **Resultado Esperado:** O alerta recebe uma tag ou aviso de "Próximo a vencer".
