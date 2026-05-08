import { Router } from "express";
import { createUser, getAllPosts, getAllUsers, getUserById, getUsersName, loginUser, uploadController} from "../controllers/public.controller";
import { localStrategyAuth } from "../middlewares/localStrategyAuth";
import { upload } from "../lib/multer";

const router = Router();

router.get('/ping', (req, res) => res.json({pong: true}))
router.post('/cadastro', createUser);
router.get("/feed/users/:page", getAllUsers);
router.get("/feed/:page", getAllPosts);
router.get("/feed/user/:name", getUsersName);
router.get("/feed/user/info/:id", getUserById);
router.post("/login",localStrategyAuth, loginUser);
//Ezibir todos os posts
router.get("/posts", getAllPosts);
//Exibir post por título 

router.post('/upload', upload.single('arquivo'), uploadController)


export default router;