# API POKÉMON (TypeScript)

Bem-vindo(a) ao repositório **API POKÉMON (TypeScript)** — uma API RESTful em TypeScript para gerenciar pokémons, usuários e pedidos, usando Express, Sequelize e MySQL.

## ✨ Visão geral

Este projeto implementa endpoints para CRUD de pokémons, autenticação de usuários, e gerenciamento de pedidos (integração com Mercado Pago incluída). O código está estruturado em pastas claras (`controllers`, `services`, `Model`, `routers`, `middleware`, etc.) para facilitar manutenção e evolução.

### Tecnologias

- Node.js + TypeScript
- Express
- Sequelize (ORM)
- MySQL (via `mysql2`)
- Mercado Pago (integração de pagamento)
- JWT para autenticação
- Dotenv para variáveis de ambiente

## Pré-requisitos

- Node.js (recomenda-se v16+)
- MySQL (ou outro servidor compatível)
- npm (ou yarn)

## Instalação

1. Clone o repositório:

```bash
git clone <url-do-repo>
cd API-POKEMON-TS
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz (exemplo abaixo).

## Variáveis de ambiente (exemplo `.env`)

Você precisa definir pelo menos as variáveis abaixo:

```
PORT=3000
DATABASE_NAME=seu_banco
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_HOST=localhost
MERCADO_PAGO_TOKEN=seu_token_mercadopago
JWT_SECRET=sua_chave_jwt
```

Observação: caso o projeto tenha outros pontos que usem env vars, adicione conforme necessário.

## Scripts úteis (do `package.json`)

- `npm run dev` — inicia o servidor em modo desenvolvimento (usa `nodemon` com `server.ts`).
- `npm run basic` — (script adicional, talvez para testes/execuções simples).
- `npm run db` — inicia `nodemon` no arquivo `src/Model/index.ts` (provavelmente para sincronização de modelos/DB).

Exemplo:

```bash
npm run dev
```

O servidor usa a porta definida em `PORT` (variável de ambiente). Se `PORT` não estiver definida, ajuste o `server.ts` ou defina a variável.

## Estrutura do projeto (resumida)

- `src/app.ts` — configuração do Express e montagem das rotas.
- `src/config` — configuração do banco e Mercado Pago.
- `src/Model` — modelos Sequelize e repositórios.
- `src/routers` — definição das rotas (pokémon, usuário, pedido).
- `src/controllers` — lógica das controllers.
- `src/services` — regras de negócio.
- `src/middleware` — middlewares de autenticação (user/admin).

## Rotas principais

As rotas estão organizadas por módulos. Pelos arquivos em `src/routers` espera-se, ao menos, os seguintes grupos:

- `/pokemons` — endpoints para criar, listar, atualizar e deletar pokémons.
- `/users` — registro, login (autenticação) e gerenciamento de usuários.
- `/orders` — criação/atualização/listagem de pedidos e integração com Mercado Pago.

Nota: consulte os arquivos em `src/routers` para as rotas exatas e verbos HTTP.

## Banco de dados

O projeto utiliza Sequelize com dialect `mysql` (driver `mysql2`). Configure sua instância MySQL e as credenciais nas variáveis de ambiente listadas acima.

Se houver um script de sincronização em `src/Model/index.ts`, você pode iniciar via `npm run db` para executar a sincronização/boot do model.

## Autenticação

Autenticação baseada em JWT. Defina `JWT_SECRET` no `.env`. Os middlewares em `src/middleware/authUser.ts` e `src/middleware/authAdmin.ts` protegem rotas que requerem token.

## Integração com Mercado Pago

Defina `MERCADO_PAGO_TOKEN` no `.env` para habilitar a criação de preferências/pagamentos via Mercado Pago. A configuração está em `src/config/mercadoPagoConfig.ts`.

## Exemplos de uso

- Criar um pokémon (POST): `/pokemons` com payload JSON contendo os campos necessários (ver `Model/Pokemon`).
- Autenticar usuário (POST): `/users/login` — retorna token JWT.
- Criar pedido (POST): `/orders` — fluxo que pode iniciar integração de pagamento.

Exemplo com `curl` (login):

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","password":"senha"}'
```

## Contribuição

Contribuições são bem-vindas. Abra issues para bugs ou feature requests e envie pull requests para ajustes.

## Dicas de desenvolvimento

- Use `nodemon` (já configurado nos scripts) para recarregar automaticamente em alterações de código.
- Verifique as tipagens em TypeScript antes de rodar: `tsc --noEmit` (se desejar checar tipos).

## Licença

Licença padrão do repositório (ver `package.json`).

---


