"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaCadastro = void 0;
const zod_1 = require("zod");
exports.userSchemaCadastro = zod_1.z.object({
    name: zod_1.z.string().min(2, 'O nome deve conter no minimo 2 caracteres.'),
    email: zod_1.z.email("O e-mail deve ser valido."),
    password: zod_1.z.string().min(6, "A senha deve conter no minimo 6 caracteres.")
});
