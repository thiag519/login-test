import { Router } from "express";
import { deleteUser, userArea} from "../controllers/private.controller";

import { checkIdUserIdReqAuth } from "../middlewares/checkIdUserIdReqAuth";
import { createPost } from "../controllers/private.post.controller";

const router = Router();
//deletar user
router.delete('/user/:id', deleteUser);
//área do usuário
router.get('/user/:id',checkIdUserIdReqAuth, userArea);
//criar post
router.post('/post/:id', checkIdUserIdReqAuth, createPost);
//curtir post
//deletar post
export default router;





