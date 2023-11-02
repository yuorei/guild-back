import { Router } from "express";
import { verifyToken } from "../interfaces/auth";
import * as usersRouter from "../userInterface/users";


const router = Router();
// /users/以下のルーティング
router.get('/', usersRouter.getAllUser);
router.get('/:id', usersRouter.getUserById);
router.post('/', usersRouter.createUser);
router.put('/', verifyToken, usersRouter.updateUser);
router.delete('/', verifyToken, usersRouter.deleteUser);

export default router;