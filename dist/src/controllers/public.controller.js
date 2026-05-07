"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = exports.getAllPosts = exports.loginUser = exports.getUserById = exports.getUsersName = exports.getAllUsers = exports.createUser = void 0;
const userSchemaCadastro_1 = require("../validations/userSchemaCadastro");
const public_model_1 = require("../models/public.model");
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const promises_1 = __importDefault(require("node:fs/promises"));
const createUser = async (req, res) => {
    const parsedData = userSchemaCadastro_1.userSchemaCadastro.safeParse(req.body);
    if (!parsedData.success) {
        const errors = parsedData.error.issues.map(issue => issue.message);
        return res.status(400).json({ success: false, error: 'Dados inválidos', details: errors });
    }
    try {
        const { name, email, password } = parsedData.data;
        const userData = await (0, public_model_1.createUserModel)(name, email, password);
        if (!userData) {
            return res.status(409).json({ success: false, error: 'Email já cadastrado!' });
        }
        ;
        return res.status(201).json({ success: true, userData });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao criar conta.', details: err });
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    let pags = Number(req.params.page) || 1;
    //const arrName:string[] = [];
    try {
        const users = await (0, public_model_1.getUsersModel)(pags);
        //users?.filter((e) => {arrName.push(e.name) });// casou eu queira apenas os nomes
        if (users == null)
            return res.status(401).json({ success: false, error: "Usuários não encontrados." });
        return res.status(200).json({ success: true, users });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao listar usuários.', err });
    }
};
exports.getAllUsers = getAllUsers;
const getUsersName = async (req, res) => {
    const { name } = req.params;
    const arrName = [];
    try {
        if (!name)
            return res.status(401).json({ success: false, error: "Usuário não encontrado." });
        const user = await (0, public_model_1.getUsersNameModal)(name);
        user?.filter((e) => { arrName.push({ name: e.name, id: e.id }); }); // casou eu queira apenas os nomes
        if (arrName == null)
            return res.status(400).json({ success: false, error: 'Usuário não encontrado.' });
        return res.status(200).json({ success: true, arrName });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuário.', err });
    }
};
exports.getUsersName = getUsersName;
const getUserById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        if (!id)
            return res.status(401).json({ success: false, error: "Usuário não encontrado." });
        const user = await (0, public_model_1.getUserByIdModal)(id);
        //console.log(user, id)
        if (user == null)
            return res.status(400).json({ success: false, error: 'Usuário não encontrado.' });
        return res.status(200).json({ success: true, user });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuário.', err });
    }
};
exports.getUserById = getUserById;
const loginUser = async (req, res) => {
    try {
        if (!req.user || !req.authInfo) {
            return res.status(401).json({ error: 'Não autenticado' });
        }
        return res.status(200).json({
            success: true,
            token: req.authInfo,
            user: req.user
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Erro ao conectar na conta'
        });
    }
    /*const parsedData = userSchemaLogin.safeParse(req.body);
    
    if(!parsedData.success) {
      const errors = parsedData.error.issues.map(issue => issue.message);
      return res.status(400).json({success: false, error: 'Dados inválidos', details:errors});
    }
    try {
      const {email, password} = parsedData.data;
      if( !email || !password) {
        return res.status(401).json({error: 'E-mail e senha são obrigatório.'});
      };
      const user = await findUserEmailPasswordModal(email, password);
      if(!user){
        return res.status(401).json({success: false, error: 'Credenciais inválidas.'});
      };
      const token = req.authInfo;
      return res.status(200).json({success:true,token,  user});
  
    } catch (err) {
      res.status(500).json({success: false, error: 'Erro ao conectar na conta.',details: err});
    };*/
};
exports.loginUser = loginUser;
const getAllPosts = async (req, res) => {
    let pags = Number(req.params.page) || 1;
    // const arrPostTitle:string[] = [];
    try {
        const posts = await (0, public_model_1.getPostsModel)(pags);
        //posts?.filter((e) => {arrPostTitle.push(e.title, e.content) });// casou eu queira apenas os nomes
        if (posts == null)
            return res.status(401).json({ success: false, error: "Posts não encontrados." });
        return res.status(200).json({ success: true, posts });
    }
    catch (err) {
        res.status(500).json({ error: 'Error ao listar posts.', err });
    }
};
exports.getAllPosts = getAllPosts;
const uploadController = async (req, res) => {
    if (req.file) {
        const newName = (0, uuid_1.v4)() + '.png';
        const image = await (0, sharp_1.default)(req.file.path)
            .resize(1280, 740, { fit: 'cover' })
            .toBuffer();
        const ffinalImage = await (0, sharp_1.default)(image)
            .composite([
            { input: './src/assets/up.png', gravity: 'southeast' }
        ])
            .toFile('./public/images/' + newName);
        const thumbImage = await (0, sharp_1.default)(image)
            .resize(200)
            .toFile('./public/images/thumb-' + newName);
        /*
        const image = await sharp(req.file.path)
          .resize(1280, 740, {fit:'cover'})
          .composite([
            {input: './src/assets/up.png', gravity: 'southeast'}
          ])
          //.grayscale()
          //.tint('#cdcffe')
          .toFormat('png')
          .toFile('./public/images/'+newName);
        */
        await promises_1.default.unlink(req.file.path); //deleta o arquivo temporario
    }
    else {
        console.log('Nenhum arquivo enviado.');
    }
    res.json({});
};
exports.uploadController = uploadController;
