# Proposta: Cadastro e Gerenciamento de Veículos

## Escopo funcional
Criação da API e das interfaces gráficas (telas) para listar, cadastrar, editar e excluir veículos associados ao usuário autenticado (RF-01). Inclui a manutenção da entidade Veículo no banco.

## Dependências
- setup-infra-and-auth

## Riscos
- **Médio:** Vazamento de dados através de IDOR. A mitigação é garantir que qualquer manipulação ou consulta de veículo valide se o recurso pertence de fato ao usuário autenticado (através do token e não do frontend).

## Execução de linter necessária
- Sim. `npm run lint` para garantir a qualidade do código frontend e backend.

## Testes unitários necessários
- Sim. Serviços do backend que criam, atualizam e excluem veículos (cobrindo happy, sad path, e validação de propriedade).

## Testes de integração necessários
- Sim. Testes nos endpoints `/api/v1/vehicles` validando os status codes e integrações com banco.

## Testes E2E necessários
- Sim. Fluxo Playwright validando a interação do usuário na listagem, criação e edição de veículos no frontend.
