# Especificação Funcional

## Requisitos

### RF-01 Cadastro e Gerenciamento de Veículos

- Permite ao usuário cadastrar um veículo para acompanhamento das informações de manutenção.
- Permite consultar os veículos cadastrados pelo usuário.
- Permite atualizar os dados do veículo.
- Permite excluir um veículo.
- Permite manter as informações de cada veículo separadas, inclusive para usuários que possuam mais de um veículo.

#### Regras de negócio

- Cada veículo deve estar associado a um único usuário responsável por seu acompanhamento.
- Os dados do veículo devem ser persistidos para consultas futuras.
- Um usuário pode possuir mais de um veículo.
- As informações de manutenção devem permanecer associadas ao respectivo veículo.
- O sistema não deve assumir um intervalo único de manutenção para todos os veículos.
- Ao excluir um veículo, suas manutenções realizadas e suas manutenções previstas associadas devem ser excluídas.
- A quilometragem atual deve ser mantida no cadastro do veículo e atualizada pelo proprietário.

### RF-02 Autenticação do Usuário

- Permite ao usuário criar uma conta.
- Permite realizar login.
- Permite encerrar a sessão.
- Permite acessar somente os dados associados ao usuário autenticado.

#### Regras de negócio

- O acesso a dados privados exige autenticação.
- Cada conta deve possuir identificador único.
- A senha não deve ser armazenada em texto puro.
- O backend deve determinar o usuário autenticado a partir da credencial de sessão/token, não de um identificador livremente informado pelo frontend.
- O usuário autenticado somente pode consultar ou alterar recursos de sua propriedade.

### RF-03 Registro de Manutenção

- Permite ao usuário registrar uma manutenção realizada em um veículo.
- Permite informar, no mínimo, o tipo de serviço, a data, a quilometragem e o custo da manutenção quando houver custo associado.
- Permite consultar os registros posteriormente para composição do histórico.
- Permite corrigir ou excluir informações registradas incorretamente.

#### Regras de negócio

- Uma manutenção deve estar associada a um único veículo.
- A data da manutenção deve ser informada.
- A quilometragem deve ser informada quando utilizada como referência para o serviço.
- O custo deve ser registrado quando houver valor associado ao serviço.
- Os registros devem ser persistidos sem duplicação indevida.
- O usuário deve conseguir corrigir informações registradas incorretamente.
- O usuário somente pode alterar ou excluir manutenções de seus próprios veículos.

### RF-04 Histórico de Manutenção

- Permite ao usuário consultar, de forma organizada, as manutenções realizadas em cada veículo.
- Permite visualizar os dados dos serviços registrados.
- Permite consultar o histórico individualmente por veículo.

#### Regras de negócio

- O histórico deve apresentar somente manutenções associadas ao veículo selecionado.
- Os registros devem ser apresentados de forma organizada para facilitar a consulta.
- O histórico deve respeitar o isolamento dos dados por usuário.
- Auditoria de alterações não faz parte do MVP.

### RF-05 Controle de Manutenções Previstas

- Permite ao usuário cadastrar uma manutenção prevista.
- Permite cadastrar várias manutenções previstas para o mesmo veículo.
- Permite acompanhar cada manutenção prevista por data, quilometragem ou ambos.
- Permite atualizar e excluir uma manutenção prevista.
- Permite consultar as manutenções previstas de um veículo.

#### Regras de negócio

- Um veículo pode possuir zero, uma ou várias manutenções previstas.
- Cada manutenção prevista deve estar associada a exatamente um veículo.
- Uma manutenção prevista pode utilizar a data, a quilometragem ou ambos como critérios de acompanhamento.
- O sistema não deve aplicar automaticamente um intervalo padrão único para todos os veículos e serviços.
- Os critérios utilizados para determinar a manutenção prevista devem ser claros para o usuário.
- Os dados utilizados no acompanhamento devem poder ser atualizados pelo proprietário.
- O usuário somente pode consultar ou alterar manutenções previstas de seus próprios veículos.

### RF-06 Controle de Gastos

- Permite consultar os custos associados às manutenções.
- Permite consultar os gastos de manutenção de um veículo.
- Permite acompanhar os custos individualmente por veículo.
- Permite apresentar totais de gastos quando aplicável.

#### Regras de negócio

- Cada custo pertence à respectiva manutenção e, consequentemente, ao veículo.
- Os valores apresentados devem considerar somente registros persistidos no sistema.
- O sistema não deve manter uma entidade ou tabela independente de gastos no MVP.
- Totais de gastos devem ser derivados dos custos das manutenções.
- O usuário somente pode consultar gastos de seus próprios veículos.

### RF-07 Visão Geral do Veículo

- Permite ao usuário visualizar um resumo das principais informações de manutenção do veículo.
- Apresenta a quilometragem atual.
- Apresenta as manutenções recentes.
- Apresenta as manutenções previstas.
- Apresenta informações sobre os gastos de manutenção.

#### Regras de negócio

- As informações da visão geral devem refletir os registros persistidos no sistema.
- Os dados apresentados devem corresponder exclusivamente ao veículo selecionado e ao usuário autenticado.
- As principais ações devem fornecer feedback claro ao usuário.

---

## Entidades

### Usuário

- Descrição
  - Representa o proprietário ou responsável pelos veículos acompanhados na aplicação.
- Atributos
  - Identificação do usuário
  - E-mail
  - Senha armazenada como hash
  - Data de criação
  - Data de atualização

### Veículo

- Descrição
  - Representa o veículo particular acompanhado pelo usuário.
- Atributos
  - Identificação
  - Usuário responsável
  - Marca
  - Modelo
  - Ano
  - Placa
  - Quilometragem atual
  - Data de criação
  - Data de atualização

### Manutenção

- Descrição
  - Representa um serviço de manutenção realizado em um veículo.
- Atributos
  - Identificação
  - Veículo
  - Tipo de serviço
  - Data
  - Quilometragem
  - Custo
  - Data de criação
  - Data de atualização

### Manutenção Prevista

- Descrição
  - Representa um serviço de manutenção planejado para um veículo.
- Atributos
  - Identificação
  - Veículo
  - Serviço previsto
  - Data prevista
  - Quilometragem prevista
  - Data de criação
  - Data de atualização

> Um veículo pode possuir várias manutenções previstas. Data prevista e quilometragem prevista são critérios independentes e podem ser utilizados isoladamente ou em conjunto.

### Gastos

- Não constitui uma entidade persistida no MVP.
- Os gastos são obtidos por meio dos custos registrados nas entidades Manutenção.
- Consultas de gastos podem realizar agregações por veículo e período.

---

## Interfaces gráficas

### Página Inicial / Visão Geral

- Campos
  - Seleção do veículo
  - Quilometragem atual
  - Resumo de manutenções recentes
  - Manutenções previstas
  - Gastos de manutenção
- Comandos
  - Selecionar veículo
  - Acessar cadastro de veículo
  - Registrar manutenção
  - Consultar histórico
  - Gerenciar manutenções previstas

### Listagem de Veículos

- Campos
  - Dados básicos do veículo
  - Quilometragem atual
- Comandos
  - Cadastrar
  - Pesquisar/consultar
  - Editar
  - Excluir
  - Selecionar veículo

### Cadastro/Edição de Veículo

- Campos
  - Marca
  - Modelo
  - Ano
  - Placa
  - Quilometragem atual
- Comandos
  - Salvar
  - Cancelar

### Registro de Manutenção

- Campos
  - Tipo de serviço
  - Data
  - Quilometragem
  - Custo
  - Veículo
- Comandos
  - Salvar
  - Cancelar

### Histórico de Manutenção

- Campos
  - Veículo
  - Tipo de serviço
  - Data
  - Quilometragem
  - Custo
- Comandos
  - Consultar
  - Detalhar
  - Editar registro
  - Excluir registro

### Manutenções Previstas

- Campos
  - Veículo
  - Serviço previsto
  - Data prevista
  - Quilometragem prevista
- Comandos
  - Cadastrar
  - Editar
  - Excluir
  - Consultar

### Gastos de Manutenção

- Campos
  - Veículo
  - Manutenção
  - Data
  - Custo
- Comandos
  - Consultar
  - Filtrar por veículo
  - Filtrar por período
  - Visualizar total

### Login

- Campos
  - E-mail
  - Senha
- Comandos
  - Entrar
  - Criar conta

### Cadastro de Usuário

- Campos
  - E-mail
  - Senha
  - Confirmação de senha
- Comandos
  - Criar conta
  - Cancelar

---

## Requisitos Não Funcionais

### RNF-01 Segurança

- Os dados dos usuários e de seus veículos devem ser protegidos contra acesso não autorizado.
- O backend deve validar autenticação e autorização.
- Senhas devem ser armazenadas somente como hash seguro.
- O frontend não pode acessar o banco de dados diretamente.

### RNF-02 Observabilidade

- A aplicação deve registrar erros e eventos técnicos relevantes para permitir diagnóstico básico.
- O MVP deve utilizar logging estruturado no backend.

### RNF-03 Escalabilidade

- A arquitetura deve permitir evolução do número de usuários, veículos e registros sem necessidade de alterações estruturais significativas.

### RNF-04 Portabilidade

- A solução deve ser utilizável em navegadores modernos.
- A interface deve ser responsiva para diferentes tamanhos de tela.

### RNF-05 Testabilidade

- As principais funcionalidades devem possuir testes automatizados.

---

## Restrições e Premissas Técnicas

### Premissas

- O proprietário é responsável por informar e manter atualizados os dados do veículo e suas manutenções.
- A quilometragem atual do veículo é informada e atualizada pelo proprietário.
- As informações de manutenção podem ser baseadas em tempo, quilometragem ou ambos.
- O usuário possui acesso a um dispositivo compatível com a aplicação.
- A autenticação é parte do MVP e será implementada pelo backend da aplicação.

### Restrições

- A solução deve ser simples e intuitiva.
- O registro das informações deve exigir pouco esforço do proprietário.
- O sistema não deve depender de integração automática com oficinas, concessionárias, fabricantes ou sistemas de diagnóstico no MVP.
- Funcionalidades de inteligência artificial para diagnóstico ou manutenção não fazem parte do produto.
- Auditoria de alterações não faz parte do MVP.
- Não deve existir uma entidade ou tabela independente de gastos no MVP.

### Dependências Externas

- Infraestrutura necessária para hospedagem e armazenamento dos dados.

---

## Critérios de Aceitação Técnica

- Os dados cadastrados devem ser persistidos e recuperados corretamente.
- As funcionalidades principais não devem apresentar perda ou duplicação indevida dos registros.
- Um usuário deve conseguir criar uma conta e realizar login.
- Um usuário deve conseguir cadastrar, editar e excluir seus veículos.
- Um usuário deve conseguir registrar, consultar, alterar e excluir manutenções.
- Um usuário deve conseguir cadastrar e acompanhar várias manutenções previstas por veículo.
- Um usuário deve conseguir consultar os gastos derivados das manutenções.
- A interface deve fornecer feedback claro para as principais ações.
- Erros de validação ou processamento devem apresentar mensagens compreensíveis.
- Um usuário não deve conseguir consultar ou alterar dados pertencentes a outro usuário.

---

## Fora de Escopo

- Diagnóstico automático de problemas mecânicos.
- Execução ou agendamento de serviços diretamente com oficinas.
- Integração obrigatória com sistemas de fabricantes, oficinas ou veículos.
- Recomendação de peças ou fornecedores.
- Funcionalidades de IA para diagnóstico ou manutenção.
- Auditoria de alterações.
- Integração automática com oficinas ou concessionárias.
- Integração automática com sistemas de diagnóstico veicular.
- Notificações automáticas no MVP.
- Anexos de documentos no MVP.

---

## Evolução Planejada

### Versão 1.0

- Notificações de próximas manutenções.
- Anexos de notas fiscais e documentos relacionados aos serviços.
- Relatórios consolidados de gastos e manutenção.

### Versões Futuras

- Integração com dados de veículos para atualização automática de quilometragem.
- Compartilhamento do histórico do veículo com oficinas ou futuros compradores.
- Recursos de comparação de custos e serviços.
- Evolução para aplicativo mobile, se houver demanda.
