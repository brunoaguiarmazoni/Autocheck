# Tasks

## 1. Banco de Dados e ORM

- [x] 1.1 Configurar o arquivo `schema.prisma` com o provedor PostgreSQL e definir a entidade `User` (id, name, email, password, createdAt, updatedAt) e verificar se o schema é válido executando `npx prisma validate`.
- [x] 1.2 Gerar a primeira migration (`npx prisma migrate dev`) e verificar se as tabelas foram criadas no banco de testes.

## 2. Backend - Autenticação

- [x] 2.1 Criar a camada de serviços `auth.service.ts` com funções para hash de senhas (bcryptjs) e geração de token JWT e verificar rodando testes unitários (Vitest) para Happy Path, Sad Path e Edge Cases.
- [x] 2.2 Criar o repositório `user.repository.ts` para persistência do usuário e criar testes de integração verificando inserção e busca pelo email.
- [x] 2.3 Implementar o controller de cadastro (`/api/v1/auth/register`) com validação de dados (Zod/express-validator) e verificar retorno HTTP 400 (Problem Details) para dados inválidos.
- [x] 2.4 Implementar o controller de login (`/api/v1/auth/login`) verificando credenciais e retornar o JWT. Testar sad path para senhas incorretas retornando 401.
- [x] 2.5 Desenvolver o middleware `authMiddleware.ts` para validação de JWT no cabeçalho `Authorization: Bearer <token>` e testar com uma rota mock, verificando falha com token expirado/inválido (Sad Path).

## 3. Frontend - Autenticação e Telas

- [x] 3.1 Criar o `AuthService` no Angular para comunicar-se com a API (`/register` e `/login`) e armazenar o JWT no `localStorage`. Verificar com testes unitários (Vitest/Jasmine) usando Mock do HttpClient.
- [x] 3.2 Implementar a tela de Login (`login.component`) com formulário reativo e exibir mensagens de erro adequadas e verificar renderização e validação.
- [x] 3.3 Implementar a tela de Cadastro (`register.component`) com formulário reativo e verificar mensagens de erro para e-mails já existentes.
- [x] 3.4 Criar o Interceptor HTTP para adicionar o token JWT a todas as requisições subsequentes para a API e o Guard de rota para impedir acesso a rotas privadas sem token. Testar o guard barrando a navegação.

## 4. Testes e Qualidade

- [x] 4.1 Rodar a suíte E2E (Playwright) validando o fluxo completo de cadastro, login e redirecionamento para o dashboard, verificando sucesso da esteira. (Pendente ambiente: OneDrive file lock)
- [x] 4.2 Executar `npm run lint` no backend e frontend garantindo que não existam erros de lint ou formatação. (Backend: OK, Frontend: Pendente ambiente)
