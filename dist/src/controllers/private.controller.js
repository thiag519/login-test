"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.deleteUser = exports.userArea = void 0;
const private_model_1 = require("../models/private.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Àrea de usuário 
const userArea = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, private_model_1.findUserByIdModel)(Number(id));
        if (user == null) {
            return res.status(401).json({ success: false, error: "Usuário não encontrado." });
        }
        ;
        user;
        return res.status(200).json({ success: true, message: "Usuário encontrado.", user });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao buscar usuário.", err });
    }
};
exports.userArea = userArea;
// Remover usuario
const deleteUser = async (req, res) => {
    try {
        const user = req.user;
        const userId = user.id;
        console.log("ID do usuário autenticado:", userId);
        const { id } = req.params;
        const userDeleted = await (0, private_model_1.DeleteUserByIdModel)(Number(id));
        if (userDeleted == null) {
            return res.status(401).json({ success: false, error: "Usuário não encontrado." });
        }
        ;
        return res.status(200).json({ success: true, message: "Usuário deletado com sucesso.", userDeleted });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao excluir usuário.", err });
    }
    ;
};
exports.deleteUser = deleteUser;
const me = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ authenticated: false });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        const user = await (0, private_model_1.getUserByIdModel)(decoded.id);
        if (!user) {
            return res.status(401).json({ authenticated: false });
        }
        return res.json({
            authenticated: true,
            userId: user.id,
            user,
        });
    }
    catch (error) {
        return res.status(401).json({ authenticated: false });
    }
};
exports.me = me;
// Alterar usuário
// passo 4 refresh token: criar função que pega orefreshtoken da requisição, 
// verifica se a refreshtoken, pego o refreshtokensalvo e comparo com o da requisição,
// se esta expirado, se é valido, chamar a funçao para criar um novo token, 
// deletar o refreshtoken antigo, chamar a função que cria um novo refresh token,
// e retornar os dois tokens, newToken e newRefreshToken 
// na pasta controllers/private.controller.ts
