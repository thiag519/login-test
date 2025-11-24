import { Router } from "express";
import { createUser, getAllUsers, getUserName } from "../controllers/public.controller";


const router = Router();
//router.use(express.json())

router.post('/cadastro', createUser);
router.get("/usuarios", getAllUsers);
router.get("/usuarios/:name", getUserName);

// rota de registro
// rota de login

export default router;