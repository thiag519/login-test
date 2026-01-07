#### Instalar Multer
``npm i multer``

#### Types multer
``npm i -D @types/multer``

#### Instalar Sharp
``npm i sharp``

#### Instalar Uuid
``npm i uuid``

#### Instalar Uuid types
``npm i -D @types/uuid``

### Sharp documentation

**[Sharp](https://sharp.pixelplumbing.com/)**




## Teste Jest

- Testes são pedaços de código que você cria para ter certeza que uma parte do sistema continua funcionando.

-  TDD (Test-Driven Development) = Desenvolvimento orientado a testes.

#### Tipos de testes:

- Testes unitários (unit test)
- Testes de integração (integration test)
- Testes end-to-end (e2e test)

### Configurando o Jest no seu projeto

#### Intlando Jest:
``npm install -D jest ts-jest @types/jest``

#### Instalar Jest config:
``npx ts-jest config:init``

#### In jest.config.js
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

#### In package.json
```json 
  "test": "jest --runInBand",
  "test:db": "dotenv -e .env.test -- prisma migrate deploy",
```

#### Rodar o teste:
```npm test``



#### Instalar biblioteca supertest
``npm install -D supertest @types/supertest``
