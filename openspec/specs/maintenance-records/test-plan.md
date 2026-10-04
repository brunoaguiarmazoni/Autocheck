# Plano de Testes E2E: Registros de Manutenção

## Visão Geral
Este plano descreve os testes E2E do fluxo de registros de manutenção (`maintenance-records`), garantindo a correta gestão e segurança no acesso aos dados.

## 1. CRUD de registros de manutenção

### Cenário 1.1: Criar registro de manutenção com sucesso
- **Objetivo:** Confirmar que um usuário pode registrar uma nova manutenção para um veículo seu.
- **Estado Inicial:** Usuário logado e possui pelo menos um veículo cadastrado.
- **Passos:**
  1. Navegar até a tela do histórico do veículo desejado e clicar em "Adicionar Manutenção".
  2. Preencher os campos obrigatórios (data, tipo do serviço, custo, descrição).
  3. Clicar em salvar.
- **Resultado Esperado:** O registro é salvo, o usuário vê uma notificação de sucesso e a nova manutenção aparece no topo da lista (ordenação pela mais recente).

### Cenário 1.2: Listar manutenções de um veículo
- **Objetivo:** Assegurar que as manutenções de um veículo específico sejam listadas corretamente e ordenadas.
- **Estado Inicial:** Usuário logado. Veículo com múltiplas manutenções criadas em datas diferentes.
- **Passos:**
  1. Navegar para o histórico/lista de manutenções do veículo.
- **Resultado Esperado:** A interface exibe todos os registros, do mais recente para o mais antigo, mostrando os detalhes essenciais (data, tipo e custo).

### Cenário 1.3: Acesso não autorizado a veículo de outro usuário
- **Objetivo:** Validar o controle de acesso (IDOR) garantindo que o backend rejeita chamadas de terceiros.
- **Estado Inicial:** Usuário logado. Conhecimento do ID de um veículo que pertence a outra conta.
- **Passos:**
  1. (Via requisição direta ao endpoint / ou navegação forçada via URL com ID alheio) Tentar criar ou ler as manutenções desse veículo.
- **Resultado Esperado:** O sistema (backend) devolve o status 403 ou 404 e a interface redireciona para uma tela de erro ou página inicial, exibindo acesso negado.

## 2. Totalização de gastos com manutenção

### Cenário 2.1: Obter total de gastos
- **Objetivo:** Confirmar a agregação dos valores das manutenções do veículo.
- **Estado Inicial:** Usuário logado. Veículo com `X` registros de manutenção que somam um custo total `Y`.
- **Passos:**
  1. Navegar para a aba de resumo de gastos ou painel do veículo em questão.
- **Resultado Esperado:** O sistema exibe o custo consolidado igual a `Y` (soma de todos os custos). Ao adicionar ou deletar uma manutenção, esse valor deve refletir a mudança imediatamente.
