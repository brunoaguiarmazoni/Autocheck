# Design

## Context
O sistema atualmente não possui infraestrutura base nem controle de acesso. A autenticação baseada em JWT é requerida para assegurar que cada usuário acesse apenas seus próprios dados (veículos e manutenções). Veja `proposal.md` para as motivações e regras aplicáveis.

## Goals / Non-Goals

**Goals:**
- Configurar o Prisma e criar a primeira migration com a entidade `User`.
- Implementar a lógica de geração de tokens JWT no login.
- Criar o middleware `authMiddleware` para validação de token em rotas protegidas no Express.
- Criar as páginas de Login e Cadastro no Angular com os respectivos serviços.
- Armazenar o token JWT com segurança no front-end.

**Non-Goals:**
- Integração com provedores externos (ex: Google, GitHub).
- Recuperação de senha por e-mail (neste primeiro momento MVP).
- Implementação de refresh tokens complexos (o token JWT simples será usado para o MVP).

## Decisions

### 1. Entidade User no Prisma
**Rationale:** Usaremos o Prisma para gerenciar o esquema e migrações. A entidade `User` precisará ter `id` (UUID), `name`, `email` (unique) e `password` (hash).
**Alternatives considered:** Usar inteiros sequenciais para ID, mas UUID provê maior segurança contra enumeração.

### 2. Hash de Senhas
**Rationale:** Usaremos `bcryptjs` (com round 10) para armazenar as senhas no banco, garantindo a proteção dos dados.
**Alternatives considered:** `argon2`, mas `bcrypt` tem suporte amplo e velocidade suficiente para o MVP.

### 3. Armazenamento do Token (Frontend)
**Rationale:** Para o MVP, usaremos `localStorage` e anexaremos o token nas requisições via Interceptor do Angular.
**Alternatives considered:** Cookies HttpOnly, que são mais seguros, mas exigem configuração de CORS e credenciais mais complexa, o que atrasaria o MVP de um projeto com frontend e backend em domínios diferentes rodando localmente (3000 e 3001).

## Risks / Trade-offs

- **[Risk] Acesso não autorizado se token for vazado:** O uso de `localStorage` expõe ao risco de XSS.
  → **Mitigation:** Manter o tempo de expiração do JWT curto (ex: 2h) e aplicar validação rigorosa das entradas do usuário para evitar XSS no Angular.

- **[Risk] IDOR:** O frontend poderia enviar o ID de outro usuário.
  → **Mitigation:** O backend sempre extrairá a identidade do usuário a partir do token (via middleware), ignorando IDs enviados no payload do front-end.
