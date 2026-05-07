"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// passo 4 jwt
const createUserTokenService = (user) => {
    const payload = { id: user.id };
    const secret = process.env.JWT_KEY;
    if (!secret)
        throw new Error("JWT_KEY not defined");
    return jsonwebtoken_1.default.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' });
};
exports.createUserTokenService = createUserTokenService;
// passo 2 refresh token: criar função que cria o refreshtoken na pasta services
