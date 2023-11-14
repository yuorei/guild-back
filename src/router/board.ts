import { Router } from "express";
import { verifyToken } from "../interface/auth";
import * as boardRouter from "../interface/board";


const router = Router();
// /board/以下のルーティング
router.get('/', boardRouter.getAllBoard);
// /user を先に持ってこないと /:id として認識されてしまう
router.get('/user', verifyToken, boardRouter.getBoardByUserId);
router.get('/challenge/count/:id', boardRouter.getChallengeCount);
router.get('/challenge/:id', boardRouter.getChallengeByBoardId);
router.get('/challenge/user/', verifyToken, boardRouter.getChallengeByUserId)
router.get('/challenge/user/:id', verifyToken, boardRouter.getCheckChallengeByUserIdAndBoardId)
router.post('/challenge/', verifyToken, boardRouter.registrationRequest);
router.get('/:id', boardRouter.getBoardById);
router.post('/', verifyToken, boardRouter.createBoard);
router.put('/:id', verifyToken, boardRouter.updateBoard);
router.delete('/:id', verifyToken, boardRouter.deleteBoard);

export default router;
