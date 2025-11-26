

import { Request, Response } from "express";
import { DeleteUserByIdModel, findUserByIdModel } from "../models/private.model";
import { fi } from "zod/v4/locales";


// Àrea de usuário 
export const userArea = async (req:Request, res:Response) => {
  try {
    const {id} = req.params;
    const user = await findUserByIdModel(Number(id));
    if(user == null) {
      return res.status(401).json({success:false, error: "Usuário não encontrado."});
    };
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