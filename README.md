# Autocheck

Aplicação web para gerenciamento de manutenção de veículos particulares. Permite ao proprietário centralizar o histórico de serviços, acompanhar manutenções previstas por data ou quilometragem e controlar os gastos de manutenção de cada veículo.

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Stack tecnológica](#stack-tecnológica)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Executando localmente](#executando-localmente)
- [Testes](#testes)
- [API](#api)
- [Documentação](#documentação)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Sobre o projeto

Proprietários de veículos particulares frequentemente perdem o controle das manutenções realizadas e dos prazos dos próximos serviços. As informações ficam distribuídas entre notas fiscais, planilhas, mensagens e documentos de oficinas, dependendo muitas vezes da memória do próprio proprietário.

O **Autocheck** resolve esse problema oferecendo uma aplicação centralizada onde o usuário pode:

- Cadastrar e gerenciar seus veículos.
- Registrar e consultar o histórico de manutenções realizadas.
- Cadastrar e acompanhar várias manutenções previstas por data, quilometragem ou ambos.
- Controlar e consultar os gastos de manutenção de cada veículo.
- Visualizar um resumo com as informações mais relevantes do veículo.

---

## Funcionalidades

| Requisito | Descrição |
|-----------|-----------|
| **RF-01** | Cadastro, consulta, edição e exclusão de veículos |
| **RF-02** | Autenticação do usuário (criação de conta, login e logout) |
| **RF-03** | Registro, consulta, edição e exclusão de manutenções realizadas |
| **RF-04** | Histórico de manutenção organizado por veículo |
| **RF-05** | Controle de manutenções previstas por data, quilometragem ou ambos |
| **RF-06** | Consulta de gastos derivados das manutenções por veículo |
| **RF-07** | Visão geral do veículo com quilometragem, manutenções e gastos |

> **Nota:** cada usuário acessa exclusivamente os dados de seus próprios veículos. O isolamento é garantido por autenticação obrigatória e autorização no backend em toda operação protegida.

---

## Arquitetura

O projeto segue uma arquitetura em camadas com frontend e backend separados:

```
┌─────────────────────────────────────┐
│           Frontend (Angular)        │
│   Angular Router · HttpClient       │
│          Tailwind CSS               │
└──────────────┬──────────────────────┘
               │ HTTPS · REST · JSON
               │ /api/v1
┌──────────────▼──────────────────────┐
│           Backend (Express)         │
│  Routes → Controllers → Services    │
│           → Repositories            │
│              Prisma ORM             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         PostgreSQL 16+              │
└─────────────────────────────────────┘
```

**Princípios arquiteturais:**

- Regras de negócio centralizadas na camada de serviços do backend.
- Frontend responsável apenas por apresentação e interação.
- Autenticação baseada em token (JWT) emitido e validado pelo próprio backend.
- Dados isolados por usuário; autorização validada em toda operação protegida.
- Infraestrutura conteinerizada com Docker Compose para execução local.
- CI/CD com GitHub Actions.

Consulte [`docs/architecture.md`](docs/architecture.md) para a especificação arquitetural completa.

---

## Stack tecnológica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Angular · TypeScript · Tailwind CSS |
| Backend | Node.js · Express · TypeScript |
| ORM | Prisma |
| Banco de dados | PostgreSQL 16+ |
| Autenticação | JWT (implementação própria) |
| Testes (unidade/integração) | Vitest |
| Testes E2E | Playwright |
| Lint | ESLint |
| Containers | Docker · Docker Compose |
| CI/CD | GitHub Actions |

---

## Estrutura do repositório

```text
/
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── core/          # guards, interceptors, services
│   │       ├── shared/        # components, models
│   │       └── features/      # auth, vehicles, maintenances,
│   │                          # upcoming-maintenances, dashboard
│   └── tests/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── models/
│   │   └── config/
│   └── tests/
├── database/
│   └── migrations/
├── docs/
│   ├── problem.md       # Definição do problema
│   ├── prd.md           # Requisitos do produto (PRD)
│   ├── spec.md          # Especificação funcional
│   └── architecture.md  # Arquitetura de software
└── docker-compose.yml
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20+
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

---

## Configuração do ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/brunoaguiarmazoni/Autocheck.git
   cd Autocheck
   ```

2. Copie o arquivo de exemplo de variáveis de ambiente e preencha os valores:

   ```bash
   cp .env.example .env
   ```

   > **Importante:** nunca versione senhas, tokens ou chaves privadas. O arquivo `.env` já está listado no `.gitignore`.

3. Instale as dependências:

   ```bash
   # Backend
   cd backend && npm install

   # Frontend
   cd ../frontend && npm install
   ```

---

## Executando localmente

Suba os serviços com Docker Compose:

```bash
docker compose up
```

Isso iniciará o PostgreSQL, o backend e o frontend. Por padrão:

| Serviço | URL |
|---------|-----|
| Frontend | `http://localhost:3000` |
| Backend (API) | `http://localhost:3001/api/v1` |

Para parar os serviços:

```bash
docker compose down
```

---

## Testes

### Lint

```bash
npm run lint
```

### Testes de unidade e integração (Vitest)

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

### Testes E2E (Playwright)

```bash
npx playwright test
```

**Cobertura mínima esperada:**

| Camada | Linhas | Branches |
|--------|--------|----------|
| Backend | 80% | 70% |
| Frontend | 70% | 60% |

---

## API

Base URL: `/api/v1`

### Endpoints públicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/register` | Criação de conta |
| `POST` | `/auth/login` | Autenticação do usuário |

### Endpoints protegidos (requerem token JWT)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET/POST` | `/vehicles` | Consulta e cadastro de veículos |
| `GET/PATCH/DELETE` | `/vehicles/{id}` | Operações sobre um veículo |
| `GET/POST` | `/vehicles/{vehicleId}/maintenances` | Histórico e registro de manutenções |
| `GET/PATCH/DELETE` | `/maintenances/{id}` | Operações sobre uma manutenção |
| `GET/POST` | `/vehicles/{vehicleId}/upcoming-maintenances` | Manutenções previstas |
| `GET/PATCH/DELETE` | `/upcoming-maintenances/{id}` | Operações sobre uma manutenção prevista |
| `GET` | `/vehicles/{vehicleId}/expenses` | Gastos derivados das manutenções |
| `GET` | `/vehicles/{vehicleId}/summary` | Visão geral do veículo |

A documentação completa da API é gerada via **OpenAPI**. Consulte a especificação em [`docs/spec.md`](docs/spec.md).

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [`docs/problem.md`](docs/problem.md) | Definição do problema, objetivos e público-alvo |
| [`docs/prd.md`](docs/prd.md) | Requisitos do produto, escopo, métricas e riscos |
| [`docs/spec.md`](docs/spec.md) | Especificação funcional, entidades e interfaces |
| [`docs/architecture.md`](docs/architecture.md) | Arquitetura, stack, segurança e observabilidade |

---

## Roadmap

### MVP (versão atual)

- [x] Cadastro e gerenciamento de veículos
- [x] Autenticação do usuário
- [x] Registro e histórico de manutenções
- [x] Controle de manutenções previstas
- [x] Consulta de gastos
- [x] Visão geral do veículo

### Versão 1.0

- [ ] Notificações de próximas manutenções
- [ ] Anexos de notas fiscais e documentos
- [ ] Relatórios consolidados de gastos e manutenção

### Versões futuras

- [ ] Integração com dados de veículos para atualização automática de quilometragem
- [ ] Compartilhamento do histórico com oficinas ou futuros compradores
- [ ] Recursos de comparação de custos e serviços
- [ ] Aplicativo mobile

---

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch descritiva para a sua alteração:
   ```bash
   git checkout -b feat/nome-da-funcionalidade
   ```
3. Implemente as alterações seguindo as [diretrizes arquiteturais](docs/architecture.md).
4. Execute lint e testes antes de abrir o pull request.
5. Abra um pull request descrevendo claramente a alteração realizada.

> **Nota:** antes de qualquer alteração, leia a documentação arquitetural e avalie os impactos técnicos, de segurança, de observabilidade e de testes.

Reporte bugs e sugira melhorias em [Issues](https://github.com/brunoaguiarmazoni/Autocheck/issues).

---

## Licença

Distribuído sob a licença ISC. Consulte o arquivo `LICENSE` para mais informações.
