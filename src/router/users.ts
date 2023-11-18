import { Router } from "express";
import { verifyToken } from "../interface/auth";
import * as usersRouter from "../interface/users";
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

// /users/以下のルーティング
router.get('/', usersRouter.getAllUser);
router.get('/:id', usersRouter.getUserById);
router.post('/', upload.single('image'), usersRouter.createUser);
router.put('/', verifyToken, usersRouter.updateUser);
router.delete('/', verifyToken, usersRouter.deleteUser);

export default router;