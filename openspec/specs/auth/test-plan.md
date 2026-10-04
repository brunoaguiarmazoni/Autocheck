# Plano de Testes E2E: Fluxo de Autenticação com Clerk

## Visão Geral
Este plano de testes descreve os cenários para validação dos fluxos de registro, login e proteção de rotas integrados com a plataforma **Clerk**, cobrindo os requisitos especificados em `openspec/specs/auth/spec.md`.

## 1. Cadastro de Usuário

### Cenário 1.1: Cadastro com sucesso
- **Objetivo:** Garantir que um usuário consiga criar uma nova conta fornecendo dados válidos.
- **Estado Inicial:** Sessão do navegador limpa; usuário na página inicial não logada.
- **Passos:**
  1. Navegar para a página de Sign Up (fornecida pelo componente do Clerk).
  2. Preencher o campo de e-mail com um endereço de e-mail gerado unicamente para o teste.
  3. Preencher o campo de senha com uma senha válida e segura.
  4. Submeter o formulário de cadastro.
  5. *Se aplicável pelo Clerk*: Simular ou preencher a etapa de verificação de OTP/e-mail (podendo ser contornado via Clerk Testing Tokens ou bypass no ambiente de testes).
- **Resultado Esperado:** A conta é criada com sucesso, a sessão é estabelecida, e o usuário é redirecionado para a área protegida do sistema (ex: Dashboard).

### Cenário 1.2: E-mail já cadastrado
- **Objetivo:** Validar a recusa de criação de contas duplicadas.
- **Estado Inicial:** Sessão limpa. Existe um usuário previamente cadastrado na base do Clerk com o e-mail alvo.
- **Passos:**
  1. Navegar para a página de Sign Up.
  2. Inserir o e-mail que já está em uso por outra conta.
  3. Preencher a senha e submeter.
- **Resultado Esperado:** O sistema bloqueia a criação e o componente do Clerk exibe um alerta/erro informando que o e-mail já está associado a uma conta existente.

## 2. Autenticação de Usuário (Login)

### Cenário 2.1: Login com sucesso
- **Objetivo:** Confirmar que credenciais válidas autenticam o usuário corretamente.
- **Estado Inicial:** Sessão limpa. Usuário alvo existe na base e está com a conta verificada.
- **Passos:**
  1. Navegar para a página de Sign In (login).
  2. Inserir o e-mail do usuário existente.
  3. Inserir a senha correta associada à conta.
  4. Clicar no botão de entrar.
- **Resultado Esperado:** O Clerk autentica a sessão, gera o token de acesso e redireciona o usuário para a área protegida.

### Cenário 2.2: Credenciais inválidas
- **Objetivo:** Verificar a segurança contra acessos não autorizados por falha na senha.
- **Estado Inicial:** Sessão limpa. Usuário alvo existe na base.
- **Passos:**
  1. Navegar para a página de Sign In.
  2. Inserir o e-mail do usuário existente.
  3. Inserir uma senha intencionalmente incorreta.
  4. Submeter o formulário.
- **Resultado Esperado:** O login falha. O usuário permanece na tela de login e visualiza uma mensagem de erro informando que as credenciais são inválidas. A sessão não é criada.

## 3. Proteção de Rotas

### Cenário 3.1: Acesso autorizado
- **Objetivo:** Garantir que o token e a sessão do Clerk dão permissão ao conteúdo privado.
- **Estado Inicial:** Usuário com login recém-efetuado (sessão ativa).
- **Passos:**
  1. A partir de um estado logado, navegar diretamente para uma rota privada pela URL (ex: `/dashboard` ou `/vehicles`).
- **Resultado Esperado:** A página é renderizada corretamente, consumindo dados protegidos com sucesso (o token JWT é repassado nas requisições sem falhas).

### Cenário 3.2: Acesso negado a visitante
- **Objetivo:** Garantir que usuários anônimos não consigam acessar páginas e dados sensíveis.
- **Estado Inicial:** Nenhuma sessão ativa no navegador (Clear Storage).
- **Passos:**
  1. Digitar e acessar a URL de uma rota privada do sistema (ex: `/dashboard`).
- **Resultado Esperado:** O sistema identifica a ausência da sessão do Clerk (middleware/guard) e bloqueia a navegação, redirecionando o usuário imediatamente para a página de Sign In. Nenhuma requisição à API backend usando a rota privada é completada.
