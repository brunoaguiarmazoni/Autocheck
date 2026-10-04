# Plano de Testes E2E: Dashboard

## Visão Geral
Este plano de testes descreve os cenários E2E para o módulo de Dashboard (resumo do veículo), validando a agregação de dados e renderização correta da interface.

## 1. Consulta de Resumo do Veículo e Renderização

### Cenário 1.1: Veículo com histórico
- **Objetivo:** Garantir que as informações consolidadas de um veículo com manutenções e gastos sejam exibidas corretamente no dashboard.
- **Estado Inicial:** Usuário logado. O veículo alvo possui dados de manutenções anteriores, manutenções futuras cadastradas e um valor consolidado de gastos.
- **Passos:**
  1. Acessar a aplicação e navegar até o Dashboard (Painel de Resumo).
  2. Selecionar o veículo alvo, caso o usuário tenha mais de um.
  3. Verificar a exibição do resumo do veículo, aguardando a finalização da carga dos dados.
- **Resultado Esperado:** 
  - A interface renderiza corretamente sem erros.
  - A seção de quilometragem exibe o valor atual do veículo.
  - A seção de próximas manutenções lista os alertas futuros.
  - A seção de histórico recente lista as últimas manutenções realizadas.
  - A seção de gastos totais reflete a soma exata dos custos das manutenções passadas.

### Cenário 1.2: Veículo sem histórico
- **Objetivo:** Verificar o comportamento do Dashboard para um veículo recém-cadastrado, sem histórico associado.
- **Estado Inicial:** Usuário logado. O veículo alvo acabou de ser cadastrado e não possui registros de manutenções ou alertas futuros.
- **Passos:**
  1. Acessar a aplicação e navegar até o Dashboard.
  2. Selecionar o veículo sem histórico.
  3. Verificar os componentes renderizados.
- **Resultado Esperado:**
  - A interface renderiza com sucesso.
  - O valor total de gastos exibido é `0` ou formatado adequadamente como monetário sem valor.
  - As seções de manutenções (histórico e previstas) exibem um estado vazio (empty state) de forma amigável (ex: "Nenhuma manutenção registrada").
