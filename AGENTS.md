# AGENTS.md — Autocheck

> Instruções operacionais carregadas no contexto do agente durante a execução.
> Leia este arquivo **antes** de qualquer alteração no repositório.

---

## 1. Comportamento Geral

### 1.1 Pense antes de codificar

- Explicite suas premissas. Se houver incerteza, pergunte antes de implementar.
- Se existirem múltiplas interpretações, apresente-as e aguarde confirmação.
- Se existir abordagem mais simples, diga. Resista à tendência de complexidade desnecessária.
- Se algo não estiver claro, **pare**, nomeie o que está confuso e pergunte.

### 1.2 Simplicidade primeiro

- Escreva o mínimo de código que resolva o problema pedido. Nada especulativo.
- Sem abstrações para código de uso único.
- Sem "flexibilidade" ou "configurabilidade" que não foi solicitada.
- Se você escreveu 200 linhas e caberiam 50, reescreva.

### 1.3 Mudanças cirúrgicas

- Toque apenas o que for necessário. Não "melhore" código adjacente.
- Não refatore o que não está quebrado.
- Combine com o estilo existente, mesmo que você prefira outro.
- Não altere testes para fazer o código passar; corrija o código.

### 1.4 Critério de conclusão (closure)

Uma tarefa está **concluída** somente quando:

1. Lint passou sem erros (`npm run lint`).
2. Testes relevantes passaram (`npm test` no pacote afetado).
3. Documentação foi atualizada se a arquitetura foi afetada.
4. A seção [Reflexão e Melhoria](#10-reflexão-e-melhoria-contínua) foi preenchida.

---

## 2. Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | Angular · TypeScript · Tailwind CSS · Angular Router · HttpClient |
| Backend | Node.js · Express · TypeScript (modo estrito) |
| ORM | Prisma |
| Banco de dados | PostgreSQL 16+ |
| Autenticação | JWT — implementação própria no backend |
| Testes unitários/integração | Vitest |
| Testes E2E | Playwright |
| Lint | ESLint |
| Containers | Docker · Docker Compose |
| CI/CD | GitHub Actions |

**Não introduza** dependências fora desta stack sem aprovação explícita.

---

## 3. Estrutura do Monorepo

```text
/
├── frontend/
│   ├── src/app/
│   │   ├── core/          # guards, interceptors, services
│   │   ├── shared/        # components, models
│   │   └── features/      # auth | vehicles | maintenances
│   │                      # upcoming-maintenances | dashboard
│   └── tests/
├── backend/
│   ├── src/
│   │   ├── controllers/   # recebe requisições, delega a services
│   │   ├── services/      # regras de negócio
│   │   ├── repositories/  # acesso à persistência (Prisma)
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── models/
│   │   └── config/
│   └── tests/
├── database/
│   └── migrations/        # todas as alterações de schema via migration
├── docs/                  # documentação do projeto (leia antes de alterar)
└── docker-compose.yml
```

**Regras de camada:**

- `controllers` → recebem requisição e delegam a `services`. Sem lógica de negócio.
- `services` → única fonte de regras de negócio. Nunca acessa DB diretamente.
- `repositories` → único ponto de acesso ao Prisma/DB.
- Angular `services` → única fonte de chamadas HTTP no frontend.
- Angular `guards` → proteção de rotas privadas.

---

## 4. Comandos Principais

### Setup inicial

```bash
git clone https://github.com/brunoaguiarmazoni/Autocheck.git
cd Autocheck
cp .env.example .env          # preencha as variáveis; nunca versione segredos
cd backend  && npm install
cd ../frontend && npm install
```

### Banco de dados

```bash
# Subir apenas o banco em container
docker compose up -d db

# Executar migrations pendentes
cd backend && npx prisma migrate deploy

# Gerar cliente Prisma após alterar schema.prisma
cd backend && npx prisma generate

# Abrir Prisma Studio (inspeção local)
cd backend && npx prisma studio
```

> **Proibido:** alterar o schema do banco manualmente. Use sempre migrations versionadas.

### Build

```bash
cd backend  && npm run build
cd frontend && npm run build
```

### Run (desenvolvimento local)

```bash
# Todos os serviços via Docker Compose
docker compose up

# Frontend: http://localhost:3000
# Backend:  http://localhost:3001/api/v1
```

### Testes

```bash
# Lint (raiz ou por pacote)
npm run lint

# Testes unitários e de integração
cd backend  && npm test
cd frontend && npm test

# Testes E2E
npx playwright test

# Relatório Playwright
npx playwright show-report
```

---

## 5. Regras de Qualidade e Testes

### Cobertura mínima

| Camada | Linhas | Branches |
|---|---|---|
| Backend | 80% | 70% |
| Frontend | 70% | 60% |

### Critérios por alteração de regra de negócio

Toda mudança em `services/` deve cobrir:

- ✅ Happy path
- ✅ Sad path (validação, dados inválidos)
- ✅ Edge cases (limites, nulos, concorrência simples)

### Padrão de erro da API

```json
{
  "type": "https://example.com/problems/validation-error",
  "title": "Erro de validação",
  "status": 400,
  "detail": "Os dados informados são inválidos.",
  "instance": "/api/v1/vehicles"
}
```

Sempre use **Problem Details** (RFC 7807) para respostas de erro. Não invente formatos.

---

## 6. Logging e Observabilidade

- Use **logging estruturado** no backend (JSON).
- Registre: erros de aplicação, falhas de autenticação, operações protegidas com erro 4xx/5xx.
- **Nunca registre:** senhas, tokens, chaves privadas ou PII desnecessária.
- Métricas a acompanhar quando disponíveis: taxa de erros HTTP, latência, disponibilidade, falhas de persistência.

---

## 7. Segurança — Restrições Obrigatórias

| Proibido | Motivo |
|---|---|
| Frontend acessar banco diretamente | Violação arquitetural |
| Regras de negócio exclusivamente no frontend | Backend é a fonte única de verdade |
| Identificador de usuário vindo livremente do frontend | IDOR — backend identifica o usuário pelo token |
| Segredos no código ou em arquivos versionados | Vazamento de credenciais |
| SQL concatenado com entrada do usuário | Injeção SQL — use Prisma sempre |
| `CORS *` em produção com autenticação | Exposição de credenciais |

**Toda operação protegida deve:**

1. Validar o token JWT.
2. Identificar o usuário a partir do token.
3. Verificar que o recurso pertence ao usuário autenticado (anti-IDOR).

---

## 8. Governança e Autonomia no Terminal

### O agente pode executar autonomamente

- `npm install` / `npm run build` / `npm test` / `npm run lint`
- `npx prisma generate` e `npx prisma migrate deploy` (ambientes de desenvolvimento)
- `docker compose up/down`
- `git status`, `git diff`, `git log`

### O agente deve perguntar antes de executar

- `git push` ou abertura de pull requests
- `npx prisma migrate reset` ou qualquer comando que apague dados
- Alterações em `docker-compose.yml` que afetem portas ou volumes persistidos
- Instalação de novas dependências não listadas na stack aprovada
- Qualquer operação em ambiente de produção

### Commits

- Mensagem no formato: `tipo(escopo): descrição curta`
- Tipos aceitos: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- Exemplos:
  - `feat(vehicles): add GET /vehicles/:id endpoint`
  - `fix(auth): validate token expiry`
  - `test(maintenances): cover sad path on service layer`

---

## 9. Context7 MCP — Consulta de Documentação Atualizada

Use o **Context7 MCP** para buscar documentação atualizada das bibliotecas antes de implementar.

```
use context7 to resolve docs for [nome-da-biblioteca]
```

**Quando usar obrigatoriamente:**

- Antes de implementar qualquer integração com Prisma, Express, Angular ou Playwright.
- Antes de alterar `playwright.config.ts` ou configurações de Vitest.
- Ao encontrar comportamento inesperado em uma dependência — verifique a documentação antes de alterar o código.
- Ao instalar uma nova versão de dependência.

---

## 10. Reflexão e Melhoria Contínua

Ao concluir qualquer alteração relevante, adicione ao final do seu relatório:

```markdown
### Reflexão pós-mudança

- **O que foi alterado:** [descrição objetiva]
- **Por que desta forma:** [decisão técnica]
- **O que poderia melhorar:** [sugestão concreta para o próximo ciclo]
- **Artefatos modificados:** [lista de arquivos]
- **Testes executados:** lint ✅ | unit ✅ | e2e ✅ (ou ❌ com motivo)
```

Esse ciclo é obrigatório para alterações em `services/`, `controllers/`, `repositories/` e qualquer arquivo em `docs/`.

---

## 11. Restrições do MVP — O que não implementar

| Fora do escopo | Motivo |
|---|---|
| Entidade/tabela de gastos | Gastos são derivados das manutenções |
| Auditoria de CREATE/UPDATE/DELETE | Não faz parte do MVP |
| Notificações automáticas | Versão 1.0 |
| Anexos de documentos | Versão 1.0 |
| Identity Provider externo | Versão futura |
| IA para diagnóstico ou recomendação | Fora do produto |
| Integração com oficinas ou concessionárias | Fora do produto |

---

## 12. Referências da Documentação do Projeto

| Documento | Conteúdo |
|---|---|
| [`docs/problem.md`](docs/problem.md) | Definição do problema, objetivos e público-alvo |
| [`docs/prd.md`](docs/prd.md) | Requisitos do produto, escopo, métricas e riscos |
| [`docs/spec.md`](docs/spec.md) | Especificação funcional, entidades, interfaces e regras de negócio |
| [`docs/architecture.md`](docs/architecture.md) | Arquitetura, stack, segurança, observabilidade e restrições |
| [`README.md`](README.md) | Visão geral, setup, comandos e roadmap |

> Leia a documentação relevante **antes** de qualquer alteração. Avalie sempre: impacto técnico, impacto de segurança, impacto em observabilidade e impacto em testes.
