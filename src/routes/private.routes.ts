import { Router } from "express";
import { deleteUser, me, userArea} from "../controllers/private.controller";

import { checkIdUserIdReqAuth } from "../middlewares/checkIdUserIdReqAuth";
import { createPost, deleteAllHistory, deletePost, getHistoryByUserId, votePostDown, votePostUp } from "../controllers/private.post.controller";

const router = Router();
//deletar user
router.delete('/user/:id',checkIdUserIdReqAuth, deleteUser);
//área do usuário
router.get('/user/:id',checkIdUserIdReqAuth, userArea);
//criar post
router.post('/post/:id', checkIdUserIdReqAuth, createPost);
//deletar post
router.delete('/post/:idPost', deletePost);
//curtir post
router.patch('/post/voteUp/:idPost', votePostUp);
router.patch('/post/voteDown/:idPost', votePostDown);
// deletar historico
router.delete('/user/historico/:id', checkIdUserIdReqAuth, deleteAllHistory);
// exibir historico
router.get('/user/historico/:id',checkIdUserIdReqAuth, getHistoryByUserId);

router.get('/me', me);

export default router;





