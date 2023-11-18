import { Router } from "express";
import { verifyToken } from "../interface/auth";
import * as boardRouter from "../interface/board";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    fileFilter(req, file, callback) {
        console.log(file.mimetype)
        if (["image/png", "image/jpeg"].includes(file.mimetype)) {
            callback(null, true);
            return;
        }
        callback(new TypeError("Invalid File Type"));
    },
});

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
router.post('/', verifyToken, upload.single('image'), boardRouter.createBoard);
router.post('/finished/:id', verifyToken, boardRouter.finishedBoard);
router.put('/:id', verifyToken, boardRouter.updateBoard);
router.delete('/:id', verifyToken, boardRouter.deleteBoard);

export default router;
