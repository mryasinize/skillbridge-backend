import { Router } from "express";
import * as controllers from "./user.controller"
import { authenticate } from "../../middlewares/authenticate";

const userRouter = Router()

userRouter.get('/user/profile', authenticate, controllers.getUserProfileController)
userRouter.patch('/user/profile', authenticate, controllers.updateUserProfileController)

export default userRouter 