import { Router } from "express";
import * as controllers from "./auth.controller"
import { authenticate } from "../../middlewares/authenticate";

const authRouter = Router()

authRouter.post('/auth/register', controllers.registerController)
authRouter.post('/auth/login', controllers.loginController)
authRouter.patch('/auth/change-password', authenticate, controllers.changePasswordController)

export default authRouter