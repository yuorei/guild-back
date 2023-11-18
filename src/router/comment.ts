import { Router } from "express";
import { verifyToken } from "../interface/auth";
import * as commentRouter from "../interface/comment";


const router = Router();
// /comment/以下のルーティング
router.get('/', commentRouter.getAllComment);
router.get('/:id', commentRouter.getCommentById);
router.get('/user/', verifyToken, commentRouter.getCommentByUserId);
router.get('/post/:id', commentRouter.getCommentByPostId);
router.get('/post/user/:id', commentRouter.getCommentAndUserByPostId);
router.post('/', verifyToken, commentRouter.createComment);
router.put('/:id', verifyToken, commentRouter.updateComment);
router.delete('/:id', verifyToken, commentRouter.deleteComment);

export default router;
