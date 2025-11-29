import { Request, Response } from "express";
import { postSchemaCreate } from "../validations/postSchemaCreate";
import { createPostModel, DeletePostByIdModel, votePostDownModel, votePostUpModel } from "../models/private.model";
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
    const {title, content, reactUp=0, reactDown=0} = parsedData.data;
     
    if(!title || !content ) return res.status(400).json({success:false, error: "Dados imcompletos. "})
    const newPost = await createPostModel(title, content, userId, reactDown, reactUp);
    return res.status(201).json({success:true, data: newPost});
    
  } catch (error) {
    
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
  try {
    const { idPost } = req.params;

    console.log( "idPost:", idPost);
    const postVoteDow = await votePostDownModel(Number(idPost) );
    if(postVoteDow == null) {
      return res.status(401).json({success:false, error: "Post não encontrado."});
    };
    return res.status(200).json({success: true, message: "Voto feito com sucesso.", postVoteDow});
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao fazer a votação.", err});
  };
};

export const votePostUp = async (req:Request, res:Response) => {
  try {
    const { idPost } = req.params;

    console.log( "idPost:", idPost);
    const postVoteUp = await votePostUpModel(Number(idPost) );
    if(postVoteUp == null) {
      return res.status(401).json({success:false, error: "Post não encontrado."});
    };
    return res.status(200).json({success: true, message: "Voto feito com sucesso.", postVoteUp});
  } catch (err) {
    return res.status(500).json({success: false, error: "Erro ao fazer a votação.", err});
  };
};
