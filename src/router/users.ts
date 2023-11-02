import { Router } from "express";
// import { getAllUsers, registerUser, getUser, selectPolitician } from "../controllers/users";
// import { authenticateUser } from "../middlewares/auth";

import * as usersRouter from "../userInterface/users";


const router = Router();

router.get('/', usersRouter.getAllUser);
router.get('/:id', usersRouter.getUserById);
router.post('/', usersRouter.createUser);
router.put('/:id', usersRouter.updateUser);
router.delete('/:id', usersRouter.deleteUser);

export default router;