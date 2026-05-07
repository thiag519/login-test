import { Request, Response } from "express"
import { userSchemaCadastro } from "../validations/userSchemaCadastro"
import { createUserModel, getPostsModel, getUsersNameModal, getUsersModel, getUserByIdModal } from "../models/public.model";
import sharp from "sharp";
import { v4 } from "uuid";
import fs from 'node:fs/promises'
;


export const createUser = async (req: Request, res: Response) => {
  const parsedData = userSchemaCadastro.safeParse(req.body);
  
  if(!parsedData.success) {
    const errors = parsedData.error.issues.map(issue => issue.message);
    return res.status(400).json({success: false, error: 'Dados inválidos', details:errors});
  }
  try {
    const {name, email, password} = parsedData.data;
    const userData = await createUserModel(name, email, password);
    if(!userData){
      return res.status(409).json({success: false, error: 'Email já cadastrado!'});
    };
    return res.status(201).json({success: true, userData});
  } catch (err) {
    return res.status(500).json({error: 'Erro ao criar conta.',details: err});
  }
};


export const getAllUsers = async (req:Request, res:Response) => {
  let pags: number = Number(req.params.page) || 1;
  //const arrName:string[] = [];
  try {
    const users = await getUsersModel(pags);
    //users?.filter((e) => {arrName.push(e.name) });// casou eu queira apenas os nomes
    
    if(users == null) return res.status(401).json({success: false, error: "Usuários não encontrados."});
    return res.status(200).json({success: true, users});
  } catch (err) {
    res.status(500).json({error: 'Erro ao listar usuários.', err});
  }
};


export const getUsersName = async (req:Request, res:Response) => {
  const {name} = req.params;
  const arrName:{name:string, id:number}[] = [];
  try {
    
    if(!name)return res.status(401).json({success:false, error: "Usuário não encontrado."});
    const user = await getUsersNameModal(name);
    user?.filter((e) => {arrName.push({name: e.name, id: e.id}) });// casou eu queira apenas os nomes

    if(arrName == null) return res.status(400).json({success:false, error: 'Usuário não encontrado.'});
    return res.status(200).json({success: true, arrName});
  } catch (err) {
    res.status(500).json({error: 'Erro ao buscar usuário.', err});
  }
};

export const getUserById = async (req:Request, res:Response) => {
  const id = Number(req.params.id);
  try {
    
    if(!id) return res.status(401).json({success:false, error: "Usuário não encontrado."});
    const user = await getUserByIdModal(id);
    //console.log(user, id)
    if(user == null) return res.status(400).json({success:false, error: 'Usuário não encontrado.'});
    return res.status(200).json({success: true, user});
  } catch (err) {
    res.status(500).json({error: 'Erro ao buscar usuário.', err});
  }
};

export const loginUser = async (req: Request, res:Response) => {
  try {
    if (!req.user || !req.authInfo) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    return res.status(200).json({
      success: true,
      token: req.authInfo,
      user: req.user
    });

  } catch (err) {
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


export const getAllPosts = async (req:Request, res:Response) => {
  let pags: number = Number(req.params.page) || 1;
 // const arrPostTitle:string[] = [];
  try {
    const posts = await getPostsModel(pags);

    //posts?.filter((e) => {arrPostTitle.push(e.title, e.content) });// casou eu queira apenas os nomes

    if(posts == null) return res.status(401).json({success: false, error: "Posts não encontrados."});
    return res.status(200).json({success: true, posts});
  } catch (err) {
    res.status(500).json({error: 'Error ao listar posts.', err});
  }
};


export const uploadController = async (req: Request, res: Response) => {
  
 if(req.file) {
  
  const newName = v4()+'.png';

  const image = await sharp(req.file.path)
    .resize(1280, 740, {fit:'cover'})
    .toBuffer();
  const ffinalImage = await sharp(image)
    .composite([
      {input: './src/assets/up.png', gravity: 'southeast'}
    ])
    .toFile('./public/images/'+newName);

  const thumbImage = await sharp(image)
    .resize(200)
    .toFile('./public/images/thumb-'+newName);

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

  await fs.unlink(req.file.path); //deleta o arquivo temporario

 } else {
  console.log('Nenhum arquivo enviado.')
 }
 res.json({})
}
