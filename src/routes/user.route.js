import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middlewares.js";
import { validId } from "../middlewares/global.midllewares.js";

import { Router } from "express";

const userRouter = Router();

userRouter.post("/create", userController.createUserController);

userRouter.use(authMiddleware);
userRouter.get("/", userController.findAllUserController);

userRouter.use(validId);
userRouter.get("/findById/:id", userController.findUserByIdController);
userRouter.patch("/update/:id", userController.updateUserController);

export default userRouter;