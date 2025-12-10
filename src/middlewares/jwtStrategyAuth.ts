import { RequestHandler } from "express";
import passport from "passport";
import { User } from "../../generated/prisma/client";

// passo 7 jwt
export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
  const authResquest = passport.authenticate('jwt', 
    (err: any, user: User |false) => {
      if(err){
        console.log("Erro no Passport JWT: ",err);
        return res.status(500).json({error: 'Erro interno na autenticaçãi.'});
      }
      if(!user) {
        return res.status(401).json({error: "Acesso negado, token inválido ou não existente."});
      }
      req.user = user;
      return next()
    }
  );
  authResquest(req, res, next);
} 