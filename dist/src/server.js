"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
/*
import express from 'express';
import cors from 'cors'
//import passport from "passport";
//import { jwtStrategy } from "./lib/passport-jwt";
//import { localStrategy } from "./lib/passport-local";


const server = express();
server.use(cors())

passport.use(jwtStrategy);// passo 6 jwt
passport.use(localStrategy);
server.use(passport.initialize());
*/
const PORT = process.env.PORT || 3001;
app_1.default.listen(PORT, () => {
    console.log(`Servidor esta rodando em http://localhost:${PORT}`);
});
