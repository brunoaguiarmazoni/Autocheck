# Definição de Requisitos do Produto (PRD)

## Descrição do produto

### Problema

> O problema é a dificuldade dos proprietários de veículos particulares em manter um controle organizado das manutenções realizadas e lembrar quando serviços de manutenção preventiva precisam ser realizados novamente.

Esse problema afeta proprietários de veículos que utilizam o carro no dia a dia, causando atrasos ou esquecimentos de manutenções preventivas, dificuldade para consultar o histórico de serviços e falta de visibilidade sobre os gastos de manutenção do veículo. Atualmente, as informações ficam distribuídas em notas fiscais, mensagens, planilhas, agendas, documentos de oficinas ou apenas na memória do proprietário.

### Solução

O produto resolve esse problema por meio de uma aplicação centralizada para gerenciamento da manutenção de veículos particulares.

Para o proprietário do veículo, a aplicação permite:
- cadastrar e gerenciar veículos;
- registrar manutenções realizadas;
- consultar o histórico de manutenção;
- cadastrar e acompanhar várias manutenções previstas;
- acompanhar manutenções previstas por data, quilometragem ou ambos;
- controlar os gastos de manutenção;
- visualizar um resumo das principais informações do veículo.

O produto será organizado principalmente em quatro fluxos:
1. autenticação do usuário;
2. cadastro e gerenciamento de veículos;
3. registro e consulta do histórico de manutenção;
4. acompanhamento das manutenções previstas e dos gastos.

### Diferenciais

* **Centralização**: reúne em um único local o histórico e as informações de manutenção do veículo.
* **Acompanhamento preventivo**: permite controlar próximos serviços considerando tempo ou quilometragem.
* **Controle de gastos**: organiza os valores das manutenções para facilitar o acompanhamento financeiro.
* **Múltiplos veículos**: permite manter os dados de diferentes veículos separados por proprietário.

---

## Perfis de Usuário

### Proprietário do veículo

#### Problemas

* Tem dificuldade para lembrar quando revisões e outros serviços precisam ser realizados.
* Possui informações de manutenção espalhadas em diferentes locais.

#### Objetivos

* Manter o histórico de manutenção do veículo organizado.
* Saber quais serviços precisam ser realizados e acompanhar seus gastos.

#### Dados demográficos

* Faixa etária: não definida no problema original.
* Localização: não definida no problema original.
* Outras características relevantes: utiliza veículo particular no dia a dia e pode ter diferentes níveis de conhecimento sobre manutenção automotiva.

#### Motivações

* Evitar atrasos em manutenções preventivas.
* Ter maior controle sobre o veículo e seus custos de manutenção.

#### Frustrações

* Precisar procurar informações em notas fiscais, mensagens, planilhas ou documentos.
* Depender da própria memória para lembrar dos próximos serviços.

### Usuário com mais de um veículo

#### Problemas

* Precisa controlar manutenções de diferentes veículos.
* Pode ter dificuldade para manter históricos e custos separados.

#### Objetivos

* Centralizar as informações de todos os veículos.
* Consultar o histórico e os gastos individualmente por veículo.

#### Dados demográficos

* Faixa etária: não definida no problema original.
* Localização: não definida no problema original.
* Outras características relevantes: possui ou é responsável por mais de um veículo particular.

#### Motivações

* Reduzir a complexidade do controle de manutenção de vários veículos.
* Evitar que serviços sejam esquecidos em qualquer um dos veículos.

#### Frustrações

* Manter registros separados para cada veículo.
* Confundir informações de manutenção ou custos entre veículos.

---

## Funcionalidades

### Requisitos Funcionais

#### RF-01 Cadastro e gerenciamento de veículo

* Objetivo: Permitir que o usuário cadastre e gerencie os dados básicos de cada veículo que deseja acompanhar.
* Permite cadastrar um veículo.
* Permite consultar os veículos cadastrados.
* Permite atualizar os dados do veículo.
* Permite excluir um veículo.

#### RF-02 Autenticação do usuário

* Objetivo: Permitir que o usuário crie sua conta e acesse seus dados de forma protegida.
* Permite criar uma conta.
* Permite realizar login.
* Permite encerrar a sessão.
* O acesso aos dados privados exige autenticação.

#### RF-03 Registro de manutenção

* Objetivo: Permitir registrar serviços realizados, incluindo informações como tipo de serviço, data, quilometragem e custo.
* Permite registrar uma manutenção realizada em um veículo.
* Permite consultar os registros.
* Permite corrigir ou excluir um registro.

#### RF-04 Histórico de manutenção

* Objetivo: Permitir consultar de forma organizada as manutenções já realizadas em cada veículo.

#### RF-05 Controle de manutenções previstas

* Objetivo: Permitir cadastrar e acompanhar várias manutenções previstas de um veículo, considerando data, quilometragem ou ambos.
* Um veículo pode possuir zero, uma ou várias manutenções previstas.
* Cada manutenção prevista pertence a exatamente um veículo.
* Permite cadastrar, consultar, atualizar e excluir manutenções previstas.

#### RF-06 Controle de gastos

* Objetivo: Permitir consultar os custos associados às manutenções de cada veículo.
* Os gastos são derivados dos custos registrados nas manutenções.
* Não existe uma entidade ou cadastro separado de gastos no MVP.

#### RF-07 Visão geral do veículo

* Objetivo: Apresentar de forma resumida as principais informações do veículo, incluindo quilometragem atual, manutenções recentes, próximas manutenções e gastos.

---

## Requisitos Não Funcionais

### RNF-01 Segurança

* Os dados dos usuários e de seus veículos devem ser protegidos contra acesso não autorizado.
* O usuário somente pode acessar recursos pertencentes à sua própria conta.
* Senhas armazenadas pela aplicação devem utilizar hash seguro e nunca ser armazenadas em texto puro.

### RNF-02 Observabilidade

* A aplicação deve registrar erros e eventos técnicos relevantes para permitir diagnóstico e manutenção.
* O MVP deve possuir logging estruturado suficiente para diagnóstico básico.

### RNF-03 Escalabilidade

* A arquitetura deve permitir evolução do número de usuários, veículos e registros sem necessidade de alterações estruturais significativas.

### RNF-04 Portabilidade

* A solução deve ser utilizável em dispositivos compatíveis com o formato definido para o MVP, priorizando uma experiência adequada em diferentes tamanhos de tela.

### RNF-05 Testabilidade

* As principais funcionalidades devem possuir testes que permitam verificar seu comportamento de forma automatizada.

---

## Métricas de Sucesso

### Métricas de Negócio

* **Usuários que mantêm pelo menos um veículo cadastrado**
  * Valor atual: não disponível.
  * Meta: pelo menos 70% dos usuários que iniciarem o cadastro devem concluir o cadastro de um veículo.
  * Prazo: primeiros 90 dias após o lançamento do MVP.

* **Usuários que registram pelo menos uma manutenção**
  * Valor atual: não disponível.
  * Meta: pelo menos 60% dos usuários com veículo cadastrado devem registrar uma manutenção.
  * Prazo: primeiros 90 dias após o lançamento do MVP.

### Métricas de Produto

* Percentual de usuários que consultam o histórico de manutenção.
* Percentual de usuários que consultam ou atualizam as manutenções previstas.

### Métricas de Operação

* Taxa de erros nas principais funcionalidades.
* Disponibilidade da aplicação.

---

## Premissas e Restrições

### Premissas

* O proprietário será responsável por informar e manter atualizados os dados de seu veículo e suas manutenções.
* A quilometragem atual do veículo será informada e mantida atualizada pelo proprietário.
* As informações de manutenção podem ser baseadas em tempo, quilometragem ou ambos.
* O usuário possui acesso a um dispositivo compatível com a aplicação.

### Restrições

* A solução deve ser simples e intuitiva.
* O registro das informações deve exigir pouco esforço do proprietário.
* Os intervalos de manutenção podem variar conforme o veículo e o serviço, portanto o produto não deve assumir um único intervalo para todos os veículos.
* O sistema não deve depender de integração automática com oficinas, concessionárias, fabricantes ou sistemas de diagnóstico no MVP.
* Funcionalidades de inteligência artificial para diagnóstico ou manutenção não fazem parte do produto.

### Dependências Externas

* Infraestrutura necessária para hospedagem e armazenamento dos dados.

---

## Escopo

### MVP

#### Incluído

* Cadastro, consulta, edição e exclusão de veículos.
* Autenticação e gerenciamento básico da sessão do usuário.
* Registro, consulta, edição e exclusão do histórico de manutenções.
* Cadastro, consulta, edição e exclusão de várias manutenções previstas por veículo.
* Acompanhamento de manutenções previstas por data, quilometragem ou ambos.
* Consulta dos custos derivados das manutenções.
* Visão geral das informações de manutenção do veículo.
* API REST entre frontend e backend.
* Persistência relacional dos dados.

#### Não Incluído

* Auditoria de alterações.
* Integração automática com oficinas ou concessionárias.
* Integração automática com sistemas de diagnóstico veicular.
* Inteligência artificial para diagnóstico ou recomendação de manutenção.
* Marketplace ou contratação de serviços de oficinas.
* Notificações automáticas.
* Anexos de notas fiscais e documentos.

### Versão 1.0

* Notificações de próximas manutenções.
* Anexos de notas fiscais e documentos relacionados aos serviços.
* Relatórios consolidados de gastos e manutenção.

### Versões Futuras

* Integração com dados de veículos para atualização automática de quilometragem.
* Compartilhamento do histórico do veículo com oficinas ou futuros compradores.
* Recursos de comparação de custos e serviços.

---

## Critérios de Aceitação do Produto

### Critérios de Negócio

* O usuário deve conseguir criar uma conta e realizar login.
* O usuário deve conseguir cadastrar e manter seus veículos associados à própria conta.
* O usuário deve conseguir registrar, consultar, alterar e excluir manutenções.
* O usuário deve conseguir cadastrar e acompanhar várias manutenções previstas para cada veículo.
* O usuário deve conseguir consultar os gastos associados às manutenções.

### Critérios Técnicos

* Os dados registrados devem ser persistidos e recuperados corretamente.
* As funcionalidades principais devem funcionar sem perda ou duplicação indevida dos registros.
* Um usuário não deve conseguir acessar ou alterar dados pertencentes a outro usuário.

### Critérios de Qualidade

* A interface deve ser simples e intuitiva.
* As principais ações devem fornecer feedback claro ao usuário.
* O sistema deve apresentar mensagens compreensíveis quando ocorrerem erros de validação ou processamento.

---

## Riscos

### Riscos de Negócio

* **Baixa adesão dos usuários ao registro das manutenções**
  * Probabilidade: MÉDIA
  * Impacto: ALTO
  * Mitigação: reduzir a quantidade de informações obrigatórias e tornar o registro rápido e simples.

* **Dados desatualizados ou incorretos informados pelo usuário**
  * Probabilidade: MÉDIA
  * Impacto: ALTO
  * Mitigação: utilizar validações, permitir correções e deixar claros os dados utilizados para determinar os próximos serviços.

### Riscos Técnicos

* **Complexidade na implementação das regras de manutenção por tempo e quilometragem**
  * Probabilidade: MÉDIA
  * Impacto: MÉDIO
  * Mitigação: iniciar com regras simples e configuráveis, permitindo evolução posterior.

* **Perda ou inconsistência dos registros**
  * Probabilidade: BAIXA
  * Impacto: ALTO
  * Mitigação: utilizar persistência adequada, validações e testes automatizados.

* **Acesso indevido aos dados de outro usuário**
  * Probabilidade: MÉDIA
  * Impacto: ALTO
  * Mitigação: autenticação obrigatória, autorização no backend e validação da propriedade do recurso em toda operação protegida.

---

## Fora de Escopo

* Diagnóstico automático de problemas mecânicos.
* Execução ou agendamento de serviços diretamente com oficinas.
* Integração obrigatória com sistemas de fabricantes, oficinas ou veículos.
* Recomendação de peças ou fornecedores.
* Funcionalidades de IA para diagnóstico ou manutenção.
* Auditoria de alterações no MVP.
* Integração automática com oficinas ou concessionárias.
* Integração automática com sistemas de diagnóstico veicular.

---

## Glossário

### Termos de Negócio

* **Manutenção preventiva**: manutenção realizada de forma planejada para reduzir o risco de falhas e manter o veículo em condições adequadas de uso.
* **Histórico de manutenção**: conjunto dos registros dos serviços realizados em um veículo.
* **Manutenção prevista**: serviço que o proprietário pretende realizar futuramente e que pode ser acompanhado por data, quilometragem ou ambos.
* **Quilometragem atual**: quilometragem informada pelo proprietário como referência atual do veículo.
* **Quilometragem**: quantidade de quilômetros percorridos pelo veículo, utilizada como um dos critérios para acompanhamento de manutenções.

### Siglas

* **PRD**: Product Requirements Document (Documento de Requisitos do Produto).
* **MVP**: Minimum Viable Product (Produto Mínimo Viável).
* **RF**: Requisito Funcional.
* **RNF**: Requisito Não Funcional.
