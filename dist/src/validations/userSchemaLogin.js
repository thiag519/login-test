"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaLogin = void 0;
const zod_1 = require("zod");
exports.userSchemaLogin = zod_1.z.object({
    email: zod_1.z.email("O e-mail deve ser valido."),
    password: zod_1.z.string().min(6, "A senha deve conter no minimo 6 caracteres.")
});
