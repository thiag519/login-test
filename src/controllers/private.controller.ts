import { Request, Response } from "express";
import { DeleteUserByIdModel, findUserByIdModel, getUserByIdModel } from "../models/private.model";
import jwt from 'jsonwebtoken';


// Àrea de usuário 
export const userArea = async (req:Request, res:Response) => {
  try {
    const {id} = req.params;
    const user = await findUserByIdModel(Number(id));
    if(user == null) {
      return res.status(401).json({success:false, error: "Usuário não encontrado."});
    };

    user
     return res.status(200).json({success: true, message: "Usuário encontrado.", user});
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao buscar usuário.", err});
  }
}

// Remover usuario
export const deleteUser = async (req:Request, res:Response) => {
  try {
    const {id} = req.params;
    const userDeleted = await DeleteUserByIdModel(Number(id));
    if(userDeleted == null) {
      return res.status(401).json({success:false, error: "Usuário não encontrado."});
    };
    return res.status(200).json({success: true, message: "Usuário deletado com sucesso.", userDeleted});
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao excluir usuário.", err});
  };
};

export const me = async (req: Request, res: Response) => {

  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401).json({authenticated: false});
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    const user = await getUserByIdModel(decoded.id);

    if(!user) {
      return res.status(401).json({authenticated: false});
    }

    return res.json({
      authenticated: true,
      userId: user.id,
      user,
    });

  } catch (error) {
    return res.status(401).json({authenticated: false});
  }
}

// Alterar usuário

// passo 4 refresh token: criar função que pega orefreshtoken da requisição, 
// verifica se a refreshtoken, pego o refreshtokensalvo e comparo com o da requisição,
// se esta expirado, se é valido, chamar a funçao para criar um novo token, 
// deletar o refreshtoken antigo, chamar a função que cria um novo refresh token,
// e retornar os dois tokens, newToken e newRefreshToken 
// na pasta controllers/private.controller.ts
