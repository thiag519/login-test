import { Router } from "express";
import { deleteUser, userArea} from "../controllers/private.controller";
import { localStrategyAuth } from "../middlewares/localStrategyAuth";

const router = Router();

router.delete('/user/:id', deleteUser)
router.get('/user/:id',userArea);

export default router;

//criar post
//curtir post
//deletar post
//deletar user
