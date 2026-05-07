"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
exports.upload = (0, multer_1.default)({
    dest: './public/tmp'
});
/*const diskStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const prefix = 'img-'+ Math.floor(Math.random() * 9999);
    cb(null, prefix + '.jpg');
  },
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  }
})

export const upload = multer({
  storage: diskStorage
});
*/
/*
OBS: AO salvar na memoria, quanto maior ou mais arquivos, maior vai ser a chance de dar problema.

Salvanso na memoria (memoria ram)
const memStorage = multer.memoryStorage();

export const upload = multer({
  storage: memStorage
});
*/
/*
Receber o upload

Manipulação de imagem
- Carregar a imagem da biblioteca de manupulação.
- Faxer os procedimentos necessários
- Salvar a imagem no local correto.
*/ 
