import { RequestHandler } from "express";
import passport from "passport";
import { LocalStrategyResponse } from "../types/localStrategyResponse";

export const localStrategyAuth: RequestHandler = (req , res, next) => {
  const authResquest = passport.authenticate('local', 
    (err:any, response: LocalStrategyResponse) => {
      if(response) {
        req.user = response.user;
        req.authInfo = response.auth;
        return next();
      }
      return res.status(401).json({error: "Acesso negado. Credenciais inválidas."})
    }
  );
  authResquest(req, res, next);
};