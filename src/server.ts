import dotenv from "dotenv";
import express from 'express';
import app from "./app";
import passport from "passport";
import { jwtStrategy } from "./lib/passport-jwt";
import { localStrategy } from "./lib/passport-local";

dotenv.config();
const server = express();

//server.use('/', router);

passport.use(jwtStrategy);// passo 6 jwt
passport.use(localStrategy);
server.use(passport.initialize());

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
  console.log( `Servidor esta rodando em http://localhost:${PORT}`);
})