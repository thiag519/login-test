"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIdUserIdReqAuth = void 0;
const checkIdUserIdReqAuth = (req, res, next) => {
    const userIdReq = req.user;
    if (!userIdReq) {
        return res.status(401).json({ success: false, error: 'Token inválido ou não fornecido.' });
    }
    ;
    //id do jwt
    const idUserAuth = userIdReq.id;
    const idParam = Number(req.params.id);
    if (userIdReq.role !== "ADMIN") {
        if (!idUserAuth)
            return res.status(403).json({ success: false, error: "Acesso negado." });
        if (idUserAuth !== idParam) {
            return res.status(403).json({ succes: false, error: "Usuário sem permissão." });
        }
        ;
    }
    return next();
};
exports.checkIdUserIdReqAuth = checkIdUserIdReqAuth;
