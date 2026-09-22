# auth Specification

## Purpose
Gerencia a autenticação e autorização de usuários no sistema, permitindo o cadastro de novas contas e o acesso seguro aos recursos através de tokens JWT.

## Requirements

### Requirement: Cadastro de Usuário
O sistema SHALL permitir o cadastro de um novo usuário fornecendo nome, e-mail e senha.

#### Scenario: Cadastro com sucesso
- **WHEN** o usuário fornece dados válidos e um e-mail não cadastrado
- **THEN** o sistema cria a conta e retorna sucesso

#### Scenario: E-mail já cadastrado
- **WHEN** o usuário tenta cadastrar um e-mail que já existe
- **THEN** o sistema retorna um erro informando que o e-mail já está em uso

### Requirement: Autenticação de Usuário (Login)
O sistema SHALL permitir que um usuário autentique-se com e-mail e senha, recebendo um token JWT para acesso às rotas protegidas.

#### Scenario: Login com sucesso
- **WHEN** o usuário fornece e-mail e senha corretos
- **THEN** o sistema retorna um token JWT válido

#### Scenario: Credenciais inválidas
- **WHEN** o usuário fornece senha incorreta
- **THEN** o sistema retorna um erro de credenciais inválidas

### Requirement: Proteção de Rotas
O sistema SHALL restringir o acesso a rotas privadas apenas a requisições contendo um token JWT válido.

#### Scenario: Acesso autorizado
- **WHEN** uma requisição a uma rota privada inclui um token JWT válido
- **THEN** o sistema permite o acesso ao recurso

#### Scenario: Acesso negado
- **WHEN** uma requisição a uma rota privada não inclui um token, ou inclui um token inválido/expirado
- **THEN** o sistema bloqueia o acesso e retorna um erro de não autorizado
