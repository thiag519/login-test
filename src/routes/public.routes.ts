import { Router } from "express";
import { createUser, getAllUsers, getUserName, loginUser } from "../controllers/public.controller";
import { localStrategyAuth } from "../middlewares/localStrategyAuth";


const router = Router();
//router.use(express.json())

router.post('/cadastro', createUser);
router.get("/feed", getAllUsers);
router.get("/feed/:name", getUserName);
router.post("/login", localStrategyAuth, loginUser);


export default router;