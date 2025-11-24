import { Router } from "express";
import { getTestPingPong } from "../controllers/teste.controller";

const router = Router();
//router.use(express.json())

router.get('/ping',getTestPingPong)

export default router;