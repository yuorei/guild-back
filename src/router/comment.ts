import { Router } from "express";
import { verifyToken } from "../interface/auth";
import * as commentRouter from "../interface/comment";


const router = Router();
// /comment/以下のルーティング
router.get('/', commentRouter.getAllComment);

export default router;
