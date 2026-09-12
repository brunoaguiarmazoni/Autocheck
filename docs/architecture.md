# Arquitetura de Software

## Contexto Arquitetural

### Objetivo

Este documento define a arquitetura de software do produto **Controle de Manutenção Veicular**, estabelecendo diretrizes técnicas, restrições arquiteturais e requisitos não funcionais para implementação do MVP.

A arquitetura foi definida a partir do PRD e da especificação funcional do produto, cujo objetivo é centralizar o cadastro de veículos, o histórico de manutenções, o acompanhamento de várias manutenções previstas e o controle dos gastos.

### Escopo

A arquitetura contempla:

* Frontend web responsivo em Angular
* Backend com API REST
* Banco de dados relacional
* Autenticação própria da aplicação
* Infraestrutura de execução e armazenamento
* Segurança e controle de acesso
* Logging e observabilidade básica

### Arquitetura de Referência

* Estilo arquitetural: arquitetura em camadas, com frontend separado do backend e persistência isolada.
* Comunicação: HTTP/HTTPS com API REST e JSON.
* Infraestrutura: aplicação conteinerizada, com frontend, backend e banco de dados como componentes independentes.
* Segurança: autenticação baseada em token e autorização por usuário, garantindo isolamento dos dados.
* Fonte única das regras de negócio: backend, principalmente na camada de serviços.
* Auditoria de alterações não faz parte do MVP.

### Stack Tecnológica

#### Frontend

* Linguagem: TypeScript
* Framework: Angular
* Roteamento: Angular Router
* Comunicação HTTP: Angular HttpClient
* Estilização: Tailwind CSS

#### Backend

* Linguagem: TypeScript
* Runtime: Node.js
* Framework: Express
* ORM: Prisma

#### Banco de Dados

* SGBD: PostgreSQL
* Versão mínima: PostgreSQL 16

#### Identidade e Autenticação

* A autenticação faz parte do MVP.
* A autenticação será implementada pelo próprio backend.
* Senhas serão armazenadas como hash seguro.
* O backend emitirá e validará tokens de sessão, preferencialmente JWT.
* Não será utilizado Identity Provider externo no MVP.

#### Desenvolvimento

* Ferramentas: Git, Node.js, npm, Docker, editor/IDE e ferramentas de testes automatizados.

#### DevOps

* CI/CD: GitHub Actions.
* Desenvolvimento local: Docker Compose.
* Infraestrutura como código adicional não é necessária para o MVP.

### Estrutura do Repositório

```text
/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── guards/
│   │   │   │   ├── interceptors/
│   │   │   │   └── services/
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   └── models/
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   ├── vehicles/
│   │   │   │   ├── maintenances/
│   │   │   │   ├── upcoming-maintenances/
│   │   │   │   └── dashboard/
│   │   │   ├── app.routes.ts
│   │   │   └── app.config.ts
│   │   └── ...
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
└── docker-compose.yml
```

---

## Adequação Funcional

### Fonte Única de Verdade

* As regras de negócio devem ser implementadas na camada de serviços do backend.
* O banco de dados é a fonte persistente de verdade para usuários, veículos, manutenções e manutenções previstas.
* Gastos são informações derivadas dos custos das manutenções e não possuem entidade persistida própria.
* O frontend é responsável pela apresentação e interação, não pela definição das regras de negócio.

### Política de Comunicação entre Camadas

Todas as operações de negócio devem ocorrer através da:

* API REST do backend.

É proibido:

* Acesso direto do frontend a camadas internas do backend.
* Acesso direto do frontend ao banco de dados.
* Implementação de regras de negócio exclusivamente no frontend.

### APIs e Versionamento

Base URL:

```text
/api/v1
```

Estratégia de versionamento:

```text
/api/v1/{recurso}
```

### Endpoints Públicos

* `POST /api/v1/auth/register` — criação de conta.
* `POST /api/v1/auth/login` — autenticação do usuário.

### Endpoints Protegidos

* `GET/POST /api/v1/vehicles` — consulta e cadastro de veículos.
* `GET/PATCH/DELETE /api/v1/vehicles/{id}` — consulta, alteração e exclusão do veículo.
* `GET/POST /api/v1/vehicles/{vehicleId}/maintenances` — histórico e registro de manutenções.
* `GET/PATCH/DELETE /api/v1/maintenances/{id}` — consulta, alteração e exclusão de um registro.
* `GET/POST /api/v1/vehicles/{vehicleId}/upcoming-maintenances` — consulta e cadastro de manutenções previstas.
* `GET/PATCH/DELETE /api/v1/upcoming-maintenances/{id}` — consulta, alteração e exclusão de uma manutenção prevista.
* `GET /api/v1/vehicles/{vehicleId}/expenses` — consulta dos gastos derivados das manutenções.
* `GET /api/v1/vehicles/{vehicleId}/summary` — visão geral do veículo.

### Contrato de API

* APIs devem ser versionadas.
* APIs devem possuir documentação OpenAPI.
* Payloads devem utilizar JSON.
* Coleções devem suportar paginação quando o volume justificar.
* Filtros e ordenação devem ser disponibilizados quando aplicáveis.
* Backend como fonte única de verdade.
* Regras de negócio não devem existir exclusivamente no frontend.

### Estratégia de Tenancy

#### MVP

* Modelo multiusuário com isolamento lógico por usuário.
* Cada veículo pertence a um usuário.
* Toda consulta ou alteração de veículo, manutenção e manutenção prevista deve validar a propriedade do recurso.

#### Evolução Futura

* A estrutura poderá evoluir para compartilhamento controlado de veículos e históricos com terceiros, como oficinas ou futuros compradores, sem alterar o princípio de isolamento dos dados.

---

## Eficiência de Desempenho

### Comunicação entre Componentes

* Protocolo: HTTPS em produção e HTTP localmente.
* Formato: JSON.
* Requisitos de segurança: TLS em produção e autenticação nos endpoints protegidos.

### Rate Limiting

* Usuário anônimo: limite recomendado de 20 requisições/minuto para endpoints de autenticação.
* Usuário autenticado: limite recomendado de 120 requisições/minuto, sujeito a ajuste após observação do uso real.

### Transações e Persistência

* Operações que alterem múltiplas entidades relacionadas devem utilizar transações do PostgreSQL através do ORM.
* Criação e atualização de registros devem possuir validação antes da persistência.
* Integridade referencial deve ser garantida por chaves estrangeiras.
* Índices devem ser criados para campos utilizados frequentemente em consultas, especialmente relacionamentos por usuário e veículo.
* A exclusão de um veículo deve remover as manutenções e manutenções previstas associadas por meio de integridade referencial/cascade configurado no banco.

### Estratégias Futuras de Escalabilidade

* Separação horizontal das instâncias do backend quando houver necessidade.
* Cache para consultas de leitura frequente quando métricas demonstrarem necessidade.
* Armazenamento de anexos em serviço de objetos quando os anexos forem incorporados à versão 1.0.

---

## Compatibilidade

### Integração

* Comunicação entre frontend e backend por API REST.
* Integrações externas, quando existirem em versões futuras, devem ser encapsuladas no backend.

### Formatos de Comunicação

* JSON para APIs.
* UTF-8 para dados textuais.

### Versionamento

* Versionamento major da API por URL (`/api/v1`).
* Mudanças incompatíveis devem gerar nova versão.

### CORS

* Permitir somente as origens do frontend configuradas para cada ambiente.
* Não utilizar `*` em produção quando houver autenticação baseada em credenciais.

### Portabilidade

* A aplicação frontend deve funcionar em navegadores modernos.
* A interface deve ser responsiva para diferentes tamanhos de tela.
* Backend e banco devem poder ser executados localmente por containers.

---

## Usabilidade

### Diretrizes Frontend

* Interface simples e intuitiva, com foco em poucas ações por tela.
* Cadastro de manutenção com o menor número possível de campos obrigatórios.
* Feedback visual claro para sucesso, validação e erro.
* A visão geral deve priorizar próximas manutenções, histórico recente, quilometragem atual e gastos.
* O frontend deve utilizar Angular Router para navegação.
* O acesso a rotas privadas deve ser protegido por guardas de autenticação.

### Experiência de Autenticação

* Usuário deve autenticar-se antes de acessar dados privados.
* O frontend deve enviar o token nas requisições protegidas.
* O token deve ser tratado de forma segura.
* Falhas de autenticação devem apresentar mensagens compreensíveis sem revelar informações sensíveis.

### Consistência de Interfaces

Permissões para componentes e serviços:

* Controllers recebem requisições e delegam regras aos serviços.
* Serviços concentram as regras de negócio.
* Repositórios concentram o acesso à persistência.
* Angular services concentram comunicação com a API no frontend.
* Guards protegem rotas privadas.
* Interceptors podem anexar o token de autenticação às requisições.

Restrições:

* Frontend não pode acessar o banco diretamente.
* Controllers não devem concentrar regras complexas de negócio.
* Componentes visuais não devem implementar regras de domínio críticas.

---

## Confiabilidade

### Tratamento de Erros

Padrão adotado:

* Respostas HTTP com códigos apropriados e corpo padronizado baseado em Problem Details.

Exemplo:

```json
{
  "type": "https://example.com/problems/validation-error",
  "title": "Erro de validação",
  "status": 400,
  "detail": "Os dados informados são inválidos.",
  "instance": "/api/v1/vehicles"
}
```

### Auditoria

* Auditoria de CREATE, UPDATE e DELETE não faz parte do MVP.
* A necessidade de auditoria poderá ser avaliada em versões futuras.

### Migrations

* Alterações estruturais do banco devem ser realizadas exclusivamente por migrations versionadas no repositório.

É proibido:

* Alterações manuais no banco como parte do processo normal de implantação.
* Alterações estruturais sem migration correspondente.

### Testes Automatizados

Ferramentas:

* Lint: ESLint
* Unidade: Vitest
* Integração: Vitest + banco de teste
* E2E: Playwright

### Cobertura Mínima

Backend:

* Linhas: 80%
* Branches: 70%

Frontend:

* Linhas: 70%
* Branches: 60%

### Critérios de Teste

Toda alteração de regra de negócio deve cobrir:

* Happy Path
* Sad Path
* Edge Cases

---

## Segurança

### Princípios Gerais

* Princípio do menor privilégio.
* Isolamento dos dados por usuário.
* Validação de entrada no backend.

### Gestão de Identidade

* Não será utilizado Identity Provider externo no MVP.
* A própria aplicação será responsável pela criação de contas, autenticação e emissão/validação de tokens.
* Um Identity Provider externo poderá ser adotado em evolução futura caso exista necessidade.

### Autenticação

#### Fluxo

Frontend:

* Coletar e-mail e senha.
* Enviar credenciais ao endpoint de autenticação.
* Receber o token de sessão.
* Armazenar somente os dados de sessão necessários de forma segura.
* Enviar o token nas requisições protegidas.

Backend:

* Validar credenciais.
* Comparar a senha informada com o hash armazenado.
* Emitir token de sessão.
* Validar token nas requisições protegidas.
* Identificar o usuário autenticado.
* Validar autorização sobre o recurso solicitado.
* Não confiar em identificadores de usuário enviados livremente pelo frontend.

Fluxo:

```text
Usuário
   |
   v
Angular
   |
   | e-mail + senha
   v
API / Auth
   |
   | valida credenciais
   v
PostgreSQL
   |
   | usuário autenticado
   v
Token de sessão
   |
   v
Angular
   |
   | requisição autenticada
   v
API
   |
   v
Service
   |
   v
Repository
   |
   v
PostgreSQL
```

### Autorização

* Modelo de autorização: controle de acesso por proprietário do recurso.
* No MVP, não existem papéis administrativos.
* Toda operação protegida deve verificar se o recurso pertence ao usuário autenticado.

### Papéis e Permissões

#### PROPRIETÁRIO

Pode:

* cadastrar e consultar seus veículos;
* editar seus veículos;
* excluir seus veículos;
* registrar, consultar, alterar e excluir suas manutenções;
* cadastrar, consultar, alterar e excluir suas manutenções previstas;
* consultar seus gastos;
* visualizar a visão geral dos seus veículos.

#### ADMINISTRADOR

* Não faz parte do escopo funcional do MVP.

### Restrições do Frontend

É proibida a utilização de:

* acesso direto ao banco de dados;
* credenciais ou segredos de infraestrutura no código cliente.

### Proteção Contra Ameaças

#### Transporte

* HTTPS/TLS obrigatório em produção.
* Redirecionamento de HTTP para HTTPS na infraestrutura de produção.

#### Headers

* `Content-Security-Policy`
* `X-Content-Type-Options`
* `Referrer-Policy`

#### Injeção

* Validar entradas.
* Utilizar queries parametrizadas por meio do ORM.
* Nunca concatenar entrada do usuário em SQL.

#### Controle de Acesso

* Validar autorização em toda operação que receba identificador de veículo, manutenção ou manutenção prevista.
* Impedir IDOR verificando se o recurso pertence ao usuário autenticado.

### Segurança de Dados

* Um usuário só pode consultar ou modificar seus próprios veículos e registros.
* Senhas devem utilizar algoritmo de hash apropriado e nunca ser armazenadas em texto puro.
* Segredos devem ser fornecidos por variáveis de ambiente ou mecanismo seguro de secrets.

### Segurança de APIs

* Endpoints protegidos exigem autenticação.
* Endpoints protegidos devem validar autorização sobre o recurso solicitado.
* Entradas devem ser validadas antes de chegar à camada de negócio.

---

## Manutenibilidade

### Organização de Código

* Organização backend por camadas: routes/controllers → services → repositories → database.
* Componentes frontend organizados por domínio funcional.
* Regras de negócio centralizadas na camada de serviços do backend.
* Comunicação HTTP do frontend centralizada em services Angular.

### Convenções de Desenvolvimento

* TypeScript com modo estrito habilitado.
* Nomes de variáveis, funções e classes devem ser descritivos e consistentes.
* Commits e pull requests devem descrever claramente a alteração realizada.

### Variáveis de Ambiente

* Configurações dependentes do ambiente devem ser fornecidas por variáveis de ambiente.
* Um arquivo `.env.example` deve documentar as variáveis necessárias sem conter segredos reais.

É proibido:

* versionar senhas, tokens ou chaves privadas;
* embutir configurações específicas de produção diretamente no código.

### Diretrizes para Agentes de IA

Antes de qualquer alteração:

* Ler documentação arquitetural.
* Avaliar impacto técnico.
* Avaliar impacto de segurança.
* Avaliar impacto de observabilidade.
* Avaliar impacto em testes.

Ao finalizar:

* Executar lint.
* Executar testes.
* Atualizar documentação quando a arquitetura for afetada.
* Informar artefatos modificados.

### Restrições Arquiteturais

* Não criar acesso direto do frontend ao banco.
* Não duplicar regras de negócio entre frontend e backend.
* Não introduzir integrações externas que estejam fora do escopo do MVP.
* Não criar uma entidade persistida de gastos no MVP.
* Não introduzir auditoria como requisito do MVP.

---

## Portabilidade

### Containers

* Backend, frontend e serviços de infraestrutura devem possuir configuração compatível com containers.
* Docker Compose deve ser utilizado para facilitar a execução local do MVP.

### Banco de Dados

Ambiente local:

* PostgreSQL executado em container.
* Schema criado e atualizado por migrations.

Ambiente de produção:

* PostgreSQL gerenciado ou containerizado, desde que mantenha compatibilidade com a versão mínima definida e disponha de backup e recuperação.

### Independência de Fornecedor

* Evitar uso de funcionalidades proprietárias do SGBD que impeçam migração sem justificativa.
* Integrações externas futuras devem ser encapsuladas atrás de interfaces/adapters.

### Infraestrutura

* Docker para empacotamento.
* Infraestrutura de produção deve permitir execução independente dos componentes da aplicação.

---

## Observabilidade

### Logging

* O MVP deve utilizar logging estruturado no backend.
* Registrar erros de aplicação e eventos técnicos relevantes.
* Não registrar senhas, tokens ou outros segredos.

### Evolução

* OpenTelemetry e tracing distribuído podem ser incorporados posteriormente caso a necessidade de diagnóstico e observabilidade justifique sua adoção.

### Métricas

Quando disponíveis no ambiente de execução, acompanhar:

* taxa de erros HTTP;
* latência das requisições;
* quantidade de requisições;
* disponibilidade da aplicação;
* falhas de persistência.

---

## Evolução Planejada

### Infraestrutura

* Escalar horizontalmente o backend quando necessário.
* Adicionar serviço de armazenamento de objetos para documentos.
* Adicionar mecanismos de backup e recuperação automatizados.

### Armazenamento

* Evoluir para armazenamento de objetos para anexos de notas fiscais e documentos da versão 1.0.
* Adicionar cache quando métricas demonstrarem necessidade.

### Pagamentos

* Não aplicável ao MVP e às funcionalidades atualmente especificadas.

### Comunicação

* Notificações de próximas manutenções na versão 1.0.
* Canais adicionais de comunicação podem ser adicionados posteriormente.

### Plataformas

* Evolução para aplicativo mobile, caso seja identificada demanda.
* A API deve permanecer independente da plataforma cliente.

### Funcionalidades

* Notificações de próximas manutenções.
* Anexos de notas fiscais e documentos.
* Relatórios consolidados de gastos e manutenção.
* Integração futura com dados de veículos para atualização automática de quilometragem.
* Compartilhamento controlado do histórico com oficinas ou futuros compradores.
* Identity Provider externo, caso seja necessário em evolução futura.
* Auditoria de alterações, caso seja identificada necessidade.

---

## Limites de Implementação do MVP

É proibido implementar:

* Diagnóstico automático de problemas mecânicos.
* Integração obrigatória com oficinas, concessionárias ou sistemas de diagnóstico veicular.
* Funcionalidades de IA para diagnóstico, recomendação ou manutenção.
* Auditoria de alterações.
* Identity Provider externo.
* Entidade ou tabela persistida de gastos.
* Notificações automáticas.
* Anexos de documentos.

Esses elementos pertencem exclusivamente a versões futuras do produto ou permanecem fora do escopo, conforme definição do PRD.
