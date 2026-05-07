#  Login & Feed API — Back-end (MVP)

Este é o back-end de um MVP de autenticação, desenvolvido em Node.js, responsável por login, validação de usuários e emissão de tokens JWT.

A API foi projetada para funcionar integrada ao front-end em Next.js, com foco em segurança, separação de responsabilidades e simplicidade.

---

###  **Tecnologias Utilizadas**

- Node.js
- Express
- TypeScript
- JWT (JSON Web Token)
- bcrypt (hash de senha)
- Prisma ORM
- PostgreSQL
- Arquitetura MVC
- Middleware de autenticação JWT

---

###  O que a API faz

- Cadastro de usuários
- Login com validação de senha criptografada
- Geração de token JWT
- Endpoint /me para validar sessão
- Proteção de rotas privadas
- Integração direta com front-end via Authorization Header

---

###  Autenticação

- Senhas armazenadas com bcrypt
- Token JWT gerado apenas no login
- Token enviado no header:
- Authorization: Bearer <token>

---

###  Estrutura de Pastas (simplificada)

```cpp
src/
 ├─ controllers/
 │   ├─ public/
 │   └─ private/
 ├─ routes/
 │   ├─ public.routes.ts
 │   └─ private.routes.ts
 ├─ middlewares/
 │   └─ jwtStrategyAuth.ts
 ├─ models/
 ├─ prisma/
 └─ app.ts
```

---

###  Rotas Principais

#### **Públicas**

- ``POST /public/login``
- ``POST /public/cadastro``
- ``GET /public/me``

#### Privadas

- ``GET /private/*`` (protegidas por JWT)

---

###  Como rodar o Back-end

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# Rodar o servidor
npm run dev
```
---

## Teste Jest

#### Tipos de testes:

- Testes unitários (unit test)
- Testes de integração (integration test)
- Testes end-to-end (e2e test)

---

### Configurando o Jest no seu projeto

#### Intlando Jest:
``npm install -D jest ts-jest @types/jest``

#### Instalar Jest config:
``npx ts-jest config:init``

---

#### No jest.config.js

``` javascript
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  detectOpenHandles:true,
  setupFiles: ["<rootDir>/src/tests/setup.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};
```
---

#### No package.json
```json 
  "test": "jest --runInBand",
  "test:db": "dotenv -e .env.test -- prisma migrate deploy",
```
---

#### Rodar o teste:
```npm test``

---

#### Instalar biblioteca supertest
``npm install -D supertest @types/supertest``

---

#### Servidor disponível em:

``http://localhost:3001``

###  Status do Projeto

 **MVP funcional**
 **Segurança aplicada**
 **Código modularizado**

---

###  Próximos Passos

- Refresh Token
- Rate limiting
- Logs estruturados
- Testes automatizados
- Deploy com Docker
