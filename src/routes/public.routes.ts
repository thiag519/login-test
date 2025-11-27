import { Router } from "express";
import { createUser, getAllUsers, getUserName, loginUser } from "../controllers/public.controller";
import { localStrategyAuth } from "../middlewares/localStrategyAuth";

const router = Router();

router.post('/cadastro', createUser);
router.get("/feed", getAllUsers);
router.get("/feed/:name", getUserName);
router.post("/login",localStrategyAuth, loginUser);
//Ezibir todos os posts
//Exibir post por título 


export default router;