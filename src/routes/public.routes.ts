import { Router } from "express";
import { createUser, getAllPosts, getAllUsers, getUserName, loginUser } from "../controllers/public.controller";
import { localStrategyAuth } from "../middlewares/localStrategyAuth";

const router = Router();

router.post('/cadastro', createUser);
router.get("/users", getAllUsers);
router.get("/feed", getAllPosts);
router.get("/feed/:name", getUserName);
router.post("/login",localStrategyAuth, loginUser);
//Ezibir todos os posts
router.get("/posts", getAllPosts);
//Exibir post por título 


export default router;