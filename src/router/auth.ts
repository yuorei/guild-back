import { Router } from "express";
import * as authRouter from "../interface/auth";


const router = Router();
// /auth/以下のルーティング
router.post('/login', authRouter.login);

export default router;