🧩 Passo 1 — Setup do Projeto
1️⃣ Criar a pasta e inicializar o projeto

Abra o terminal e execute:

mkdir mini-bank
cd mini-bank
npm init -y

2️⃣ Instalar as dependências

Principais:

npm install express dotenv


De desenvolvimento:

npm install -D typescript ts-node-dev @types/express @types/node prisma

3️⃣ Inicializar o TypeScript
npx tsc --init


Edite o arquivo tsconfig.json e garanta que estas opções estejam ajustadas:

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}

4️⃣ Estrutura inicial de pastas

Crie as pastas:

mkdir src src/routes src/controllers src/services src/prisma

5️⃣ Configurar scripts no package.json

Adicione dentro de "scripts":

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}

6️⃣ Criar o arquivo base do servidor

📄 src/server.ts

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mini Bank API rodando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

7️⃣ Testar o servidor

Rode:

npm run dev


Abra no navegador:
👉 http://localhost:3000

Você deve ver:

Mini Bank API rodando 🚀

8️⃣ Configurar o Prisma e o banco PostgreSQL
npx prisma init


Isso cria um arquivo .env e o diretório prisma/.

No arquivo .env, ajuste a URL do seu banco:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/minibank?schema=public"


(O nome do banco pode ser “minibank”, crie ele no PostgreSQL.)

🧭 Pronto!
Seu projeto está configurado com:

TypeScript;

Express;

Prisma;

Banco PostgreSQL conectado.


🧩 Passo 2 — Modelagem do Banco (Prisma)
1️⃣ Abrir o arquivo prisma/schema.prisma

Apague o conteúdo padrão e substitua por isto:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Account {
  id        Int           @id @default(autoincrement())
  name      String
  email     String         @unique
  balance   Decimal        @default(0.00)
  createdAt DateTime       @default(now())
  transactionsFrom Transaction[] @relation("fromAccount")
  transactionsTo   Transaction[] @relation("toAccount")
}

model Transaction {
  id          Int      @id @default(autoincrement())
  fromId      Int
  toId        Int
  amount      Decimal
  createdAt   DateTime @default(now())

  fromAccount Account  @relation("fromAccount", fields: [fromId], references: [id])
  toAccount   Account  @relation("toAccount", fields: [toId], references: [id])
}

2️⃣ Instalar o cliente do Prisma
npm install @prisma/client

3️⃣ Aplicar a primeira migração

No terminal:

npx prisma migrate dev --name init

Isso vai:

Criar o banco (caso ainda não exista);

Gerar as tabelas Account e Transaction;

Criar o cliente do Prisma (node_modules/@prisma/client).

4️⃣ Testar o acesso ao banco com o Prisma Studio

Você pode visualizar e manipular dados pelo painel visual do Prisma:

npx prisma studio


Abra o link (geralmente http://localhost:5555)
Você verá as tabelas Account e Transaction.

5️⃣ Criar o cliente Prisma na pasta src/prisma

📄 src/prisma/client.ts

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

6️⃣ Testar o cliente Prisma no servidor

📄 src/server.ts (adicione um teste simples antes do app.listen)

import express from "express";
import dotenv from "dotenv";
import { prisma } from "./prisma/client";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const accounts = await prisma.account.findMany();
  res.json({ message: "Mini Bank API rodando 🚀", accounts });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});


Rode:

npm run dev


Acesse:
👉 http://localhost:3000

Você deve ver um JSON como:

{
  "message": "Mini Bank API rodando 🚀",
  "accounts": []
}


🧾 Recapitulando o que temos até aqui:

Banco PostgreSQL rodando com Prisma;

Tabelas Account e Transaction;

Conexão testada via prisma.client;


🧩 Passo 3 — Endpoints REST

Vamos implementar os seguintes endpoints:

Método	Rota	Descrição
POST /accounts	Cria uma nova conta	
GET /accounts/:id	Retorna os dados e saldo de uma conta	
POST /transactions	Faz uma transferência entre contas	
GET /transactions/:accountId	Lista o histórico de transações da conta


## O que é autenticação e autorização?

AUTENTICAÇÃO

AUTORIZAÇÃO



## Passport: Introdução

## Passport: Fazendo autenticação local 

**Instalar Passport**
``npm i passport``

**Processo de Login Local**
``npm i passport-local``

**Types Passport**
``npm i -D @types/passport-local``




## Passport: Autorizando com JWT 

**JWT** = JsonWebToken

> **Autenticação**
Payload = Carga =  Gera uma HASH com o nosso HASH privado

> **Autorização**
Decifra o hash (ultilizando o hash privado)

**Instalar Passport JWT**
``npm i passport-jwt``

**Types Passport JWT**
``npm i -D @types/passport-jwt``

**Instalar Biblioteca responsavel por criar e verificar jwt**
``npm i jsonwebtoken``






## Passport: Autorizando com Bearer

**Instalar Passport para autorização**
``npm i passport-http-bearer``

**Types Passport Bearer**
``npm i -D @types/passport-http-bearer``





## Upload de arquivos com Multer

**Algumas bibliotecas de UpLoad**

  - MULTER
  - FORMIDABLE
  - BUSTOP

**Instalar Multer**
``npm i multer``

**Intalar types Multer**
``npm i -D @types/multer``






## Manipulando uma imagem

[Link da biblioteca](https://sharp.pixelplumbing.com/)

**Instalar sharp**
``npm i sharp``