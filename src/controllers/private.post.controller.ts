import { Request, Response } from "express";
import { postSchemaCreate } from "../validations/postSchemaCreate";
import { checkHistoryModal, createPostModel, deleteHitoryUserById, DeletePostByIdModel, votePostModel } from "../models/private.model";
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
    //if(!title || !content ) return res.status(400).json({success:false, error: "Dados imcompletos. "})
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

    const postDeleted = await DeletePostByIdModel(Number(idPost), Number(idUser) );
    if(!postDeleted) {
      return res.status(401).json({success:false, error: "Post ou usuário não encontrado."});
    };
    return res.status(200).json({success: true, message: "Post deletado com sucesso.", postDeleted});
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao excluir post.", err});
  };
};


// Curtir post
export const votePostDown = async (req:Request, res:Response) => {
  const user = req.user as User;
  const userId  = user.id;
  try {
    const { idPost } = req.params;

    const voteDown:string = 'reactDown';
    const postVoteDow = await votePostModel(Number(idPost), userId, voteDown );
     if("error" in postVoteDow ) {
      return res.status(postVoteDow.status).json({error: postVoteDow.error}) 
    };

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

    const voteUp:string = 'reactUp';

    const postVoteUp = await votePostModel(Number(idPost), userId, voteUp);
    if("error" in postVoteUp ) {
      return res.status(postVoteUp.status).json({error: postVoteUp.error}) 
    };
      
    return res.status(201).json({success: true, message: "Voto feito com sucesso.", postVoteUp});
 
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

    if(!historyDeleted)  {
      return res.status(404).json({success:false, error: "Historico não encontrado."})
    };
    return res.status(201).json({success: true, message: 'Historico limpo com sucesso.'})
  } catch (err) {
     return res.status(500).json({success: false, error: "Erro ao limpar historico.", err});
  }
};

export const getHistoryByUserId = async (req: Request, res: Response) => {
  const user = req.user as User
  const userId  = user.id 
  try {
    const historyUser = await checkHistoryModal(userId);
    
    if(!historyUser) {
     return res.status(401).json({success:false, error: "Historico não encontrado."}) 
    };
    return res.status(200).json({success: true, message: 'Historico de curtidas do usuario.', historyUser})
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao listar historico.", err});
  };
};