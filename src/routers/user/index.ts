import express, { Router } from "express";
import userController from "../../controllers/users/userController";
import authUser from "../../middleware/authUser";

const userRouter: Router = express.Router();

userRouter.post('/user', userController.createUser);

userRouter.post('/user/auth', userController.authUser);

userRouter.get('/user/me', authUser, userController.getUser);

userRouter.get('/users', authUser, userController.getUsers);

userRouter.delete('/user/me', authUser, userController.destroyUser);

userRouter.patch('/user/me', authUser, userController.updateUser);

export default userRouter;
