"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchemaCreate = void 0;
const zod_1 = __importDefault(require("zod"));
exports.postSchemaCreate = zod_1.default.object({
    title: zod_1.default.string().min(5, "O titulo deve conter no minimo 5 caracteres.").max(20, "O titulo deve conter no maximo 20 caracteres."),
    content: zod_1.default.string().min(10, "O conteudo deve conter no minimo 10 caracteres.").max(300, "O conteudo deve conter no maximo 300 caracteres.")
});
