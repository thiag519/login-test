import { Router } from "express";
import { deleteUser, me, userArea} from "../controllers/private.controller";

import { checkIdUserIdReqAuth } from "../middlewares/checkIdUserIdReqAuth";
import { createPost, deleteAllHistory, deletePost, getHistoryByUserId, getHistoryVoteDownByUserId, getHistoryVoteUpByUserId, votePostDown, votePostUp } from "../controllers/private.post.controller";
import { upload } from "../lib/multer";

const router = Router();

router.delete('/user/:id',checkIdUserIdReqAuth, deleteUser);
router.get('/user/:id',checkIdUserIdReqAuth, userArea);
router.post('/post/:id', checkIdUserIdReqAuth, createPost);
router.delete('/post/:idPost', deletePost);
router.patch('/post/voteUp/:idPost', votePostUp);
router.patch('/post/voteDown/:idPost', votePostDown);
router.delete('/user/historico/:id', checkIdUserIdReqAuth, deleteAllHistory);
router.get('/user/historico/:id',checkIdUserIdReqAuth, getHistoryByUserId);
router.get('/user/historico/voteUp/:id',checkIdUserIdReqAuth, getHistoryVoteUpByUserId);
router.get('/user/historico/voteDown/:id',checkIdUserIdReqAuth, getHistoryVoteDownByUserId);


router.get('/me', me);

export default router;





