import { Request, Response } from "express"
import { userSchemaCadastro } from "../validations/userSchemaCadastro"
import { createUserModel, findUserEmailPasswordModal, getUserNameModal, getUsersModel } from "../models/public.model";
import { userSchemaLogin } from "../validations/userSchemaLogin";
import { createUserTokenService } from "../services/user.service";
import { authenticate } from "passport";



// Criar usuario
export const createUser = async (req: Request, res: Response) => {
  const parsedData = userSchemaCadastro.safeParse(req.body);
  
  if(!parsedData.success) {
    const errors = parsedData.error.issues.map(issue => issue.message);
    return res.status(400).json({success: false, error: 'Dados inválidos', details:errors});
  }
  try {
    const {name, email, password} = parsedData.data;

    if(!name || !email || !password) {
      return res.status(401).json({error: 'Nome, email e senha são obrigatório.'});
    }

    const user = await createUserModel(name, email, password);
    if(user) {
      return res.status(200).json({success: true, user});
    }

    if(user === null){
      return res.status(401).json({success: false, error: 'E-mail ja cadastrado!'});
    }
  } catch (err) {
    res.status(500).json({error: 'Error ao criar conta.', err});
  }
};

// Pegar todos os usuarios
export const getAllUsers = async (req:Request, res:Response) => {
  const arrName:string[] = [];
  try {
    const users = await getUsersModel();
    users?.filter((e) => {arrName.push(e.name) });// casou eu queira apenas os nomes
    console.log(arrName)
    if(users == null) return res.status(401).json({success: false, error: "Usuários não encontrados."});
    return res.status(200).json({success: true, users});
  } catch (err) {
    res.status(500).json({error: 'Error ao listar usuários.', err});
  }
};

export const getUserName = async (req:Request, res:Response) => {
  const {name} = req.params;
  try {
    
    if(!name)return res.status(401).json({success:false, error: "Usuário não encontrado."});
    const userName = await getUserNameModal(name);
    if(userName == null) return res.status(400).json({success:false, error: 'Usuário não encontrado.'});
    return res.status(200).json({success: true, userName});
  } catch (err) {
    res.status(500).json({error: 'Error ao buscar usuário.', err});
  }
};

export const loginUser = async (req: Request, res:Response) => {
  const parsedData = userSchemaLogin.safeParse(req.body);
  
  if(!parsedData.success) {
    const errors = parsedData.error.issues.map(issue => issue.message);
    return res.status(400).json({success: false, error: 'Dados inválidos', details:errors});
  }
  try {
    const {email, password} = parsedData.data;
    if( !email || !password) {
      return res.status(401).json({error: 'E-mail e senha são obrigatório.'});
    }
    const user = await findUserEmailPasswordModal(email, password);
    if(user) {
      //return res.status(200).json({success: true, user});
      const token = req.authInfo ;
      //console.log("Token : ", token)
      return res.status(200).json({success:true, token, user});
    }
    if(user === null){
      return res.status(401).json({success: false, error: 'E-mail ja cadastrado!'});
    }
  } catch (err) {
    res.status(500).json({error: 'Error ao conectar na conta.', err});
  }

}

