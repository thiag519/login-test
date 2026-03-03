import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../../generated/prisma/client";

export const checkIdUserIdReqAuth  = (req: Request, res:Response, next:NextFunction) => {
  
  const userIdReq = req.user as User | undefined;
  if(!userIdReq) {
    return res.status(401).json({success: false, error: 'Token inválido ou não fornecido.'});
  };
  //id do jwt
  const idUserAuth = userIdReq.id;
  const idParam = Number(req.params.id);

  if(userIdReq.role !== "ADMIN") {
    if(!idUserAuth) return res.status(403).json({success:false, error: "Acesso negado."});
    if(idUserAuth !== idParam) {
      return res.status(403).json({succes:false,error: "Usuário sem permissão."});
    };
  }
  return next();
};

