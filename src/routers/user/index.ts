import express, { Router } from "express";
import userController from "../../controllers/users/userController";
import authUser from "../../middleware/authUser";
import authAdmin from "../../middleware/authAdmin";

const userRouter: Router = express.Router();

userRouter.post('/user', userController.createUser);

userRouter.post('/user/auth', userController.authUser);

userRouter.get('/user/me', authUser, userController.getUser);

userRouter.get('/users', userController.getUsers);

userRouter.delete('/user/me', authUser, userController.destroyUser);

userRouter.patch('/user/me', authUser, userController.updateUser);

//admin
userRouter.get('/user/:email', authAdmin, userController.getUserAdmin)

export default userRouter;
