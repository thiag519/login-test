import { Router } from "express";
import { deleteUser, userArea} from "../controllers/private.controller";

import { checkIdUserIdReqAuth } from "../middlewares/checkIdUserIdReqAuth";
import { createPost, deletePost, votePostDown, votePostUp } from "../controllers/private.post.controller";

const router = Router();
//deletar user
router.delete('/user/:id', deleteUser);
//área do usuário
router.get('/user/:id',checkIdUserIdReqAuth, userArea);
//criar post
router.post('/post/:id', checkIdUserIdReqAuth, createPost);
//deletar post
router.delete('/post/:idPost', deletePost);
//curtir post
router.patch('/post/voteUp/:idPost', votePostUp);
router.patch('/post/voteDown/:idPost', votePostDown);

export default router;





