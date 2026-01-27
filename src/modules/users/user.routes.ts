import { Router } from "express";
import * as controllers from "./user.controller"

const userRouter = Router()

userRouter.get('/user/profile', controllers.getUserProfileController)
userRouter.patch('/user/profile', controllers.updateUserProfileController)

export default userRouter 