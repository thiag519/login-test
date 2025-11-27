import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../../generated/prisma/client";

export const checkIdUserIdReqAuth  = (req: Request, res:Response, next:NextFunction) => {
  //id do jwt
  const idUserJwt = req.user as User ;
  //id do rota
  const idUserRoute = Number(req.params.id);
  if(!idUserJwt.id) return res.status(403).json({success:false, error: "Acesso negado."});
  if(idUserJwt.id !== idUserRoute) {
    return res.status(401).json({succes:false,error: "Usuário não autenticado."});
  };
  return next();
};

