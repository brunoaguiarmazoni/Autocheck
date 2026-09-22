# Proposta: Visão Geral do Veículo (Dashboard)

## Escopo funcional
Desenvolvimento da página inicial (Dashboard) que apresenta de forma resumida as principais informações do veículo: quilometragem atual, resumo de manutenções recentes, manutenções previstas e gastos. Implementação do endpoint de consolidação no backend (RF-07).

## Dependências
- maintenance-records
- upcoming-maintenances

## Riscos
- **Baixo:** Baixa complexidade funcional, focada em agregação de leitura. O risco é apenas de formatação incorreta, minimizado pois o MVP não terá gargalos de escala.

## Execução de linter necessária
- Sim. Executar `npm run lint`.

## Testes unitários necessários
- Sim. Unidade do componente de dashboard no frontend, mockando as respostas agregadas.

## Testes de integração necessários
- Sim. Testar o endpoint agregador `/api/v1/vehicles/{vehicleId}/summary` no backend para garantir a correta unificação das entidades.

## Testes E2E necessários
- Sim. Teste Playwright para validar a renderização correta de todas as seções (previstas, recentes, km e gastos) no layout final.
