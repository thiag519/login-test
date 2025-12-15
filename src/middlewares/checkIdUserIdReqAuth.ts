import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../../generated/prisma/client";

export const checkIdUserIdReqAuth  = (req: Request, res:Response, next:NextFunction) => {
  //id do jwt
  const userIdReq = req.user as User | undefined;
  console.log("id da req: ",userIdReq?.id)
  if(!userIdReq) {
    return res.status(401).json({success: false, error: 'Token inválido ou não fornecido.'});
  };
  const idJwt = userIdReq.id;
  
  const idParam = Number(req.params.id);
  console.log("id do param: ",idParam)
  
  if(!idJwt) return res.status(403).json({success:false, error: "Acesso negado."});
  if(idJwt !== idParam) {
    return res.status(403).json({succes:false,error: "Usuário sem permissão."});
  };
  return next();
};

