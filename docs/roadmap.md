# Roadmap de Implementação Incremental: Autocheck

Este roadmap reflete o planejamento para a implementação do MVP do **Controle de Manutenção Veicular**, dimensionando as mudanças para que nenhuma ultrapasse médio tamanho, complexidade e risco. Todo o trabalho foi derivado dos requisitos funcionais, arquiteturais (Angular + Node + Prisma) e da prototipação do projeto de design visual obtida no sistema de design Stitch.

## Mudanças Planejadas (OpenSpec)

O escopo do projeto foi dividido nas seguintes propostas incrementais, que podem ser acompanhadas via OpenSpec:

1. **setup-infra-and-auth**: 
   - **Objetivo:** Estabelecer fundações do repositório, configuração do banco de dados (Prisma/PostgreSQL) e criação da base do usuário (Autenticação/Login).
   - **Risco/Tamanho:** Médio
   - **Gatilho de Sucesso:** Usuário autenticado obtém token JWT; Frontend controla rotas autenticadas.

2. **vehicles-management**: 
   - **Objetivo:** Funcionalidades de gerenciamento básico de veículos (RF-01).
   - **Risco/Tamanho:** Médio
   - **Gatilho de Sucesso:** Usuário listar, inserir, alterar e deletar os próprios veículos.

3. **maintenance-records**: 
   - **Objetivo:** Registro do histórico de manutenção realizada e controle dos gastos derivados (RF-03, RF-04, RF-06).
   - **Risco/Tamanho:** Médio
   - **Gatilho de Sucesso:** Usuário consegue manter registro histórico e visualizar valores financeiros sem criação de novas entidades isoladas.

4. **upcoming-maintenances**: 
   - **Objetivo:** Gestão de manutenções previstas baseadas em tempo, km ou ambos (RF-05).
   - **Risco/Tamanho:** Médio
   - **Gatilho de Sucesso:** Alertas e controles prospectivos baseados na customização individual inserida pelo proprietário.

5. **dashboard-summary**: 
   - **Objetivo:** Visão agregadora e centralizada do status do veículo escolhido (RF-07).
   - **Risco/Tamanho:** Baixo
   - **Gatilho de Sucesso:** O painel reflete o estado combinado do veículo, histórico, previsões e gastos.

## Regras e Garantias de Qualidade

Para todas as mudanças acima, as seguintes regras são inegociáveis e obrigatórias para closure, conforme `AGENTS.md` e regras de arquitetura:
- Todos os `proposal.md` preveem execução de linter, testes unitários (Vitest), testes de integração e E2E (Playwright).
- O backend atua como única fonte de verdade (nenhum acesso direto a banco via front).
- Uso rigoroso do padrão RFC 7807 (Problem Details).
- Acesso indevido de IDOR (Insecure Direct Object Reference) deve ser testado extensivamente nas validações de propriedade dos recursos.
