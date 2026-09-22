# Proposta: Controle de Manutenções Previstas

## Escopo funcional
Desenvolvimento das funcionalidades (API e frontend) para cadastrar e acompanhar várias manutenções previstas para um veículo, considerando critérios de data, quilometragem ou ambos (RF-05).

## Dependências
- vehicles-management

## Riscos
- **Médio:** Regras mistas (data/km) podem causar complexidade. Mitigado implementando regras simples iniciais e mantendo a lógica restrita ao backend, sem automatismos complexos no MVP.

## Execução de linter necessária
- Sim. O padrão do repositório deve ser verificado (`npm run lint`).

## Testes unitários necessários
- Sim. Validações da lógica de criação e consulta considerando critérios de quilometragem, data ou ambos simultaneamente. 

## Testes de integração necessários
- Sim. Testes de API para os endpoints protegidos (`/api/v1/upcoming-maintenances/*`) e interação correta via ORM.

## Testes E2E necessários
- Sim. Cadastro e visualização de manutenções previstas na tela correspondente do frontend via Playwright.
