import { Request, Response } from "express";
import { postSchemaCreate } from "../validations/postSchemaCreate";
import { checkHistoryModal, createHistoryModal, createPostModel, deleteHitoryUserById, DeletePostByIdModel, Reacting, votePostDownModel, votePostUpModel } from "../models/private.model";
import { User } from "../../generated/prisma/client";

// Crear post
export const createPost = async (req:Request, res: Response) => {
  const user = req.user as User;
  const userId = user.id;

  const parsedData = postSchemaCreate.safeParse(req.body);
    if(!parsedData.success) {
      const errors = parsedData.error.issues.map(issue => issue.message);
      return res.status(400).json({success: false, error: 'Dados inválidos', details:errors});
    }
  try {
    const {title, content} = parsedData.data;
     
    if(!title || !content ) return res.status(400).json({success:false, error: "Dados imcompletos. "})
    const newPost = await createPostModel(title, content, userId);
    return res.status(201).json({success:true, newPost});
    
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao criar post.", err});
  }
};

// Deletar post
export const deletePost = async (req:Request, res:Response) => {
  const user = req.user as User; 
  const idUser = user.id;
  try {
    const { idPost } = req.params;

    console.log("idUser:", idUser, "idPost:", idPost);
    const postDeleted = await DeletePostByIdModel(Number(idPost), Number(idUser) );
    if(postDeleted == null) {
      return res.status(401).json({success:false, error: "Post ou usuário não encontrado."});
    };
    return res.status(200).json({success: true, message: "Post deletado com sucesso.", postDeleted});
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao excluir post.", err});
  };
};


// Curtir post
export const votePostDown = async (req:Request, res:Response) => {
  const user = req.user as User
  const userId  = user.id
  try {
    const { idPost } = req.params;

    console.log( "idPost:", idPost);
    console.log("userId: ", userId)
    const postVoteDow = await votePostDownModel(Number(idPost) );
    if(postVoteDow == null) {
      return res.status(401).json({success:false, error: "Post não encontrado."});
    };
  
    createHistoryModal(Number(userId), Number(idPost));
    return res.status(200).json({success: true, message: "Voto feito com sucesso.", postVoteDow});
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao fazer a votação.", err});
  };
};

export const votePostUp = async (req:Request, res:Response) => {
  const user = req.user as User
  const userId  = user.id
  try {
    const { idPost } = req.params;

    console.log( "idPost:", idPost);
    console.log("userId: ", userId);
    const postVoteUp = await votePostUpModel(Number(idPost) );
    if(postVoteUp == null) {
      return res.status(401).json({success:false, error: "Post não encontrado."});
    };
    
    createHistoryModal(Number(userId), Number(idPost));
    return res.status(200).json({success: true, message: "Voto feito com sucesso.", postVoteUp});
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao fazer a votação.", err});
  };
};

// History
export const deleteAllHistory = async (req: Request, res: Response) => {
  const user = req.user as User
  const userId  = user.id
  try {
    const historyDeleted = await deleteHitoryUserById(Number(userId));

    if(historyDeleted == null)  {
      return res.status(401).json({success:false, error: "Historico não encontrado."})
    };

    return res.status(201).json({success: true, message: 'Historico limpo com sucesso.'})
  } catch (err) {
     return res.status(500).json({success: false, error: "Erro ao limpar historico.", err});
  }
};

export const getHistoryByUserId = async (req: Request, res: Response) => {
  const user = req.user as User
  const userId  = user.id 
  console.log("userId: ", userId);
  try {
    const historyUser = await checkHistoryModal(userId);
    
    if(historyUser === null) {
     return res.status(401).json({success:false, error: "Historico não encontrado."}) 
    }
    return res.status(201).json({success: true, message: 'Historico de curtidas do usuario.', historyUser})
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao listar historico.", err});
  }
}