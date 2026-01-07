import { RequestHandler } from "express";
import passport from "passport";
import { LocalStrategyResponse } from "../types/localStrategyResponse";

export const localStrategyAuth: RequestHandler = (req , res, next) => {
  
  passport.authenticate(
    'local',
    (err: any, user: any, info: any) => {
         
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

      if(user.user && user.auth) {
        req.user = user.user;
        req.authInfo = user.auth;
      }else {
        req.user = user;
        req.authInfo = info;
      }
      return next();
    }
  )(req, res, next);

  /*const authResquest = passport.authenticate('local', 
    (err:any, response: LocalStrategyResponse) => {
      if(err) {
        console.log("Erro na estratégia local:", err)
        return next(err)
      };
      if(!response) {
        console.log("Resposta inválida na estratégia local");
       return res.status(401).json({error: "Acesso negado. Credenciais inválidas."});
      };
      req.user = response.user;
      req.authInfo = response.auth;
      return next();
    }
  );
  authResquest(req, res, next);*/
};
