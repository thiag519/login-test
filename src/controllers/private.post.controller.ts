import { Request, Response } from "express";
import { postSchemaCreate } from "../validations/postSchemaCreate";
import { createPostModel } from "../models/private.model";
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
    return res.status(201).json({success:true, data: newPost});
    
  } catch (error) {
    
  }
};
// Deletar post
// Curtir post