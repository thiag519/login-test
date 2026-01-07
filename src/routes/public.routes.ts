import { Router } from "express";
import { createUser, getAllPosts, getAllUsers, getUserName, loginUser, uploadController} from "../controllers/public.controller";
import { localStrategyAuth } from "../middlewares/localStrategyAuth";
import { upload } from "../lib/multer";

const router = Router();

router.get('/ping', (req, res) => res.json({pong: true}))
router.post('/cadastro', createUser);
router.get("/users", getAllUsers);
router.get("/feed", getAllPosts);
router.get("/feed/:name", getUserName);
router.post("/login",localStrategyAuth, loginUser);
//Ezibir todos os posts
router.get("/posts", getAllPosts);
//Exibir post por título 

router.post('/upload', upload.single('arquivo'), uploadController)


export default router;