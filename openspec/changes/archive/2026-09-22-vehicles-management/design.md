# Design

## Context
O projeto possui a infraestrutura base (Node.js/Express, Angular, PostgreSQL, Prisma) e a autenticação já configuradas (`setup-infra-and-auth`). Agora, precisamos implementar a gestão de veículos, que é a entidade central para os demais módulos do sistema (RF-01). Todas as operações precisam garantir que o usuário manipule apenas os dados de sua propriedade, extraindo a identidade do usuário do token JWT.

## Goals / Non-Goals

**Goals:**
- Implementar o modelo Prisma para Veículo.
- Criar os endpoints CRUD (`GET`, `POST`, `PUT`, `DELETE` em `/api/v1/vehicles`).
- Garantir a proteção contra IDOR validando o ID do usuário autenticado no backend.
- Desenvolver as interfaces no Angular (Listagem, Cadastro e Edição) integradas à API.

**Non-Goals:**
- Gerenciamento de manutenções ou histórico do veículo (será implementado em outra etapa).
- Integração automática para buscar dados do veículo pela placa.

## Decisions

### 1. Modelagem do Banco de Dados
**Decisão:** Criar a tabela `Vehicle` no Prisma com as seguintes colunas:
- `id`: String (UUID, chave primária)
- `userId`: String (chave estrangeira para a tabela de usuário)
- `brand`: String
- `model`: String
- `year`: Int
- `licensePlate`: String (única por usuário, ou globalmente se desejado, mas vamos manter simples sem unicidade global obrigatória por enquanto, apenas campos básicos).
- `currentMileage`: Int
- `createdAt`, `updatedAt`: DateTime
**Alternativas:** Armazenar dados do veículo em um banco NoSQL. Rejeitada, pois a stack do projeto exige PostgreSQL relacional.

### 2. Estrutura da API
**Decisão:** Criar um `VehicleController` e um `VehicleService`. O Controller receberá o `req.user.id` (injetado pelo middleware de autenticação já existente) e repassará ao Service. O Service aplicará as regras de negócio:
- Na listagem: `findMany({ where: { userId } })`.
- Na atualização/exclusão: buscar o veículo pelo `id`, verificar se `vehicle.userId === userId` antes de prosseguir.
**Alternativas:** Fazer a verificação de dono diretamente no Controller. Rejeitada para manter o Controller livre de regras de negócio, conforme especificado na arquitetura do projeto.

### 3. Frontend Angular
**Decisão:** Criar um módulo/feature `vehicles` com:
- `VehicleListComponent`: Para exibir os veículos cadastrados.
- `VehicleFormComponent`: Para criar ou editar um veículo (usando Reactive Forms).
- `VehicleService`: Para realizar as chamadas HTTP (usando `HttpClient`).
**Alternativas:** Usar Template-driven forms. Rejeitada, pois Reactive Forms oferece melhor testabilidade e validação para este caso.

## Risks / Trade-offs

- **Risk:** IDOR (Insecure Direct Object Reference). Um usuário mal-intencionado pode tentar alterar ou excluir o veículo de outro passando um ID diferente na URL.
  - **Mitigation:** As funções de edição, consulta por ID e exclusão no backend sempre validarão se `vehicle.userId === req.user.id` antes de efetuar a ação.
