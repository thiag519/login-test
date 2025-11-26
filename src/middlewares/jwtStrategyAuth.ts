import { RequestHandler } from "express";
import passport from "passport";
import { User } from "../../generated/prisma/client";

// passo 7 jwt
export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
  const authResquest = passport.authenticate('jwt', 
    (err: any, user: User |false) => {
      if(user) {
        req.user = user;
        return next();
      }
      return res.status(401).json({error: "Acesso negado, token inválido ou não existente."});
    }
  );
  authResquest(req, res, next);
}