import { Request, Response } from "express";
import { DeleteUserByIdModel, findUserByIdModel } from "../models/private.model";



// Àrea de usuário 
export const userArea = async (req:Request, res:Response) => {
  console.log("req.authInfo no auserArea: ", req.authInfo)
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

// Alterar usuário

// passo 4 refresh token: criar função que pega orefreshtoken da requisição, 
// verifica se a refreshtoken, pego o refreshtokensalvo e comparo com o da requisição,
// se esta expirado, se é valido, chamar a funçao para criar um novo token, 
// deletar o refreshtoken antigo, chamar a função que cria um novo refresh token,
// e retornar os dois tokens, newToken e newRefreshToken 
// na pasta controllers/private.controller.ts
