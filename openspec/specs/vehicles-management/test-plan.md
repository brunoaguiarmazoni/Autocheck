# Plano de Testes E2E: Gerenciamento de Veículos

## Visão Geral
Este plano define os casos de testes E2E para a gestão básica de frota/veículos (`vehicles-management`), focando em isolamento (IDOR) e ciclo de vida do recurso.

## 1. Cadastro de Veículo

### Cenário 1.1: Cadastro com sucesso
- **Objetivo:** Validar o preenchimento e gravação dos dados básicos de um veículo.
- **Estado Inicial:** Usuário logado.
- **Passos:**
  1. Navegar até a lista de veículos e acionar a criação de um novo veículo.
  2. Preencher os dados: marca, modelo, ano, placa e quilometragem atual.
  3. Submeter formulário.
- **Resultado Esperado:** Veículo é adicionado na listagem, mensagem de sucesso aparece para o usuário.

### Cenário 1.2: Dados incompletos
- **Objetivo:** Validar tratamento de erros na entrada de dados.
- **Estado Inicial:** Usuário logado.
- **Passos:**
  1. Tentar criar um veículo deixando a placa ou marca em branco.
  2. Submeter formulário.
- **Resultado Esperado:** Mensagens de erro de validação (Problem Details via backend ou form no frontend) informam quais campos são obrigatórios.

## 2. Consulta de Veículos

### Cenário 2.1: Listagem de veículos próprios
- **Objetivo:** Garantir que apenas os dados do usuário aparecem em sua sessão.
- **Estado Inicial:** Usuário 'A' possui veículos, e Usuário 'B' (o usuário testador logado) possui seus próprios veículos diferentes de 'A'.
- **Passos:**
  1. Acessar a página principal de "Meus Veículos".
- **Resultado Esperado:** O usuário 'B' visualiza apenas os carros que cadastrou, sem nenhum dado misturado de 'A'.

### Cenário 2.2: Proteção contra IDOR na consulta
- **Objetivo:** Garantir que o endpoint rejeita leitura indevida por IDs diretos.
- **Estado Inicial:** Usuário logado, conhecimento do UUID/ID de um veículo que pertence a terceiros.
- **Passos:**
  1. Tentar navegar diretamente para `/vehicles/{ID_TERCEIRO}` ou executar fetch direto na API.
- **Resultado Esperado:** É negado o acesso e exibida página de Não Encontrado (404) ou Não Autorizado (403).

## 3. Atualização de Veículo

### Cenário 3.1: Atualização com sucesso
- **Objetivo:** Verificar a mudança da quilometragem atual ou troca de dados de um carro.
- **Estado Inicial:** Usuário logado e proprietário do veículo existente.
- **Passos:**
  1. Entrar na edição do veículo.
  2. Alterar a placa ou atualizar a quilometragem atual.
  3. Salvar as edições.
- **Resultado Esperado:** O registro é atualizado e as demais dependências do sistema (como Dashboard) refletem o dado novo imediatamente.

### Cenário 3.2: Proteção contra IDOR na atualização
- **Objetivo:** Impedir manipulações através de APIs abertas.
- **Estado Inicial:** Usuário logado. ID de terceiros conhecido.
- **Passos:**
  1. Executar PUT/PATCH para `/api/vehicles/{ID_TERCEIRO}` com payload de atualização.
- **Resultado Esperado:** Erro de autorização 403/404 retornado pela API.

## 4. Exclusão de Veículo

### Cenário 4.1: Exclusão com sucesso
- **Objetivo:** Testar o ciclo final da entidade e efeitos cascata.
- **Estado Inicial:** Usuário logado. Veículo escolhido criado e contendo manutenções vinculadas.
- **Passos:**
  1. Clicar para deletar o veículo.
  2. Aceitar o aviso de confirmação na UI.
- **Resultado Esperado:** O veículo some da listagem do usuário. (Um teste secundário do BD garantiria que manutenções vinculadas também sofrem `cascade delete`).

### Cenário 4.2: Proteção contra IDOR na exclusão
- **Objetivo:** Evitar deletes destrutivos por usuários externos.
- **Estado Inicial:** Usuário logado. ID do veículo pertencente a outro.
- **Passos:**
  1. Tentar acionar `DELETE /api/vehicles/{ID_TERCEIRO}`.
- **Resultado Esperado:** O backend previne a exclusão devolvendo código 403/404, e o veículo original permanece ileso.
