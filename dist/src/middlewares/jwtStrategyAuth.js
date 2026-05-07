"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategyAuth = void 0;
const passport_1 = __importDefault(require("passport"));
// passo 7 jwt
const jwtStrategyAuth = (req, res, next) => {
    const authResquest = passport_1.default.authenticate('jwt', (err, user) => {
        if (err) {
            console.log("Erro no Passport JWT: ", err);
            return res.status(500).json({ error: 'Erro interno na autenticação.' });
        }
        if (!user) {
            return res.status(401).json({ error: "Acesso negado, token inválido ou não existente." });
        }
        req.user = user;
        return next();
    });
    authResquest(req, res, next);
};
exports.jwtStrategyAuth = jwtStrategyAuth;
