"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStrategyAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const localStrategyAuth = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.status(401).json({ error: 'Credenciais inválidas' });
        if (user.user && user.auth) {
            req.user = user.user;
            req.authInfo = user.auth;
        }
        else {
            req.user = user;
            req.authInfo = info;
        }
        return next();
    })(req, res, next);
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
exports.localStrategyAuth = localStrategyAuth;
