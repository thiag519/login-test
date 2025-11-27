import { RequestHandler } from "express";
import passport from "passport";
import { LocalStrategyResponse } from "../types/localStrategyResponse";

export const localStrategyAuth: RequestHandler = (req , res, next) => {
  const authResquest = passport.authenticate('local', 
    (err:any, response: LocalStrategyResponse) => {
      if(err) return next(err);
      if(response) {
        req.user = response.user;
        req.authInfo = response.auth;
        //console.log("localStrategyAuth - response:", response.auth, );
        return next();
      }
      //console.log("localStrategyAuth - response:", response, req.authInfo);
      return res.status(401).json({error: "Acesso negado. Credenciais inválidas."})
    }
  );
  authResquest(req, res, next);
};

/**
 * Análise rápida — não está ótima. Pontos principais:

  Typo: authResquest → authRequest.
  Não trata err retornado pelo Passport (deve chamar next(err)).
  Callback do Passport costuma ser (err, user, info), não um único response.
  Possível problema de tipos: precisa ampliar Express.Request para ter authInfo.
  Logs no console e falta de retornos explícitos podem levar a múltiplos next()/respostas.
  Sugestão de versão mais robusta (corrige erros, trata err, usa nomes claros e tipagem simples)
 * 
 * 
 *export const localStrategyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) return next(err); // trata erro do Passport
        if (!user) {
            // credenciais inválidas
            return res.status(401).json({ error: 'Acesso negado. Credenciais inválidas.' });
        }

        req.user = user;
        req.authInfo = info; // certifique-se de que Request foi ampliada (veja arquivo de tipos abaixo)
        return next();
    });

    return authRequest(req, res, next);
}
 */