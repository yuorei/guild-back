import { Router } from "express";
import { verifyToken } from "../interface/auth";
import * as boardRouter from "../interface/board";


const router = Router();
// /board/以下のルーティング
router.get('/', boardRouter.getAllBoard);
router.get('/:id', boardRouter.getBoardById);
router.post('/', verifyToken, boardRouter.createBoard);
router.put('/:id', verifyToken, boardRouter.updateBoard);
router.delete('/:id', verifyToken, boardRouter.deleteBoard);

export default router;
